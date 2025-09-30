// processImage - Node.js 20 + AWS SDK v3 + Bedrock (Claude 3.5 Haiku)
// - Safe-content moderation (Rekognition Moderation)
// - Issue classification (Rekognition DetectLabels -> ISSUE_MAP)
// - Reverse geocoding with Amazon Location (Arabic stored in DynamoDB only)
// - Writes ASCII-only metadata to S3 (lat/lng/issuetype)
// - Adds Bedrock-generated user message (short Arabic & English) and severity (1–5) into DynamoDB
// - Keeps HTTP response shape unchanged

const {
  RekognitionClient,
  DetectModerationLabelsCommand,
  DetectLabelsCommand,
} = require("@aws-sdk/client-rekognition");

const {
  S3Client,
  HeadObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  GetCommand
} = require("@aws-sdk/lib-dynamodb");

const {
  LocationClient,
  SearchPlaceIndexForPositionCommand,
} = require("@aws-sdk/client-location");

const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

// ====== ENV ======
const REGION       = process.env.AWS_REGION || "us-west-2";
const BUCKET       = process.env.BUCKET_NAME;
const PENDING      = process.env.PENDING_PREFIX    || "pending/";
const APPROVED     = process.env.APPROVED_PREFIX   || "approved/";
const QUARANTINE   = process.env.QUARANTINE_PREFIX || "quarantine/";
const TABLE        = process.env.TABLE_NAME        || "Reports";
const THRESH       = Number(process.env.MODERATION_THRESHOLD || 0.8);
const PLACE_INDEX  = process.env.PLACE_INDEX_NAME  || "safe-way-index";
const CLAUDE_MODEL = process.env.CLAUDE_MODEL_ID   || "anthropic.claude-3-5-haiku-20241022-v1:0";

// ====== SDK clients ======
const s3   = new S3Client({ region: REGION });
const rek  = new RekognitionClient({ region: REGION });
const ddb  = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }));
const loc  = new LocationClient({ region: REGION });
const bed  = new BedrockRuntimeClient({ region: REGION });

// ====== Label -> Issue mapping (Arabic descriptions) ======
const ISSUE_MAP = [
  {
    typeCode: "1a",
    typeName: "Street light ON in daytime",
    keywords: ["street light", "lamp post", "light pole", "إنارة", "عمود", "نور"],
    description: "عمود إنارة مضاء نهارًا"
  },
  {
    typeCode: "1b",
    typeName: "Street light OFF at night / hazard",
    keywords: ["street light", "lamp post", "light pole", "electrical", "كهرباء", "إنارة"],
    description: "عمود إنارة مطفأ/خطر ليلًا"
  },
  {
    typeCode: "2a",
    typeName: "Open manhole / raised cover",
    keywords: ["manhole", "sewer", "drain", "بلاعة", "غرفة تفتيش"],
    description: "بلاعة مفتوحة أو مرتفعة عن سطح الطريق"
  },
  {
    typeCode: "3a",
    typeName: "Road crack / pothole",
    keywords: ["pothole", "crack", "asphalt", "road", "شارع", "كسر", "حفر"],
    description: "تكسر/نقرة في الطريق"
  },
  {
    typeCode: "4a",
    typeName: "Sewage overflow",
    keywords: ["sewage", "wastewater", "overflow", "مجارى", "صرف"],
    description: "طفح/تسريب صرف صحي"
  }
];

// ====== Helpers: issue mapping and severity ======
function mapLabelsToIssue(labels) {
  const lowered = labels.map(l => ({
    name: String(l.Name || "").toLowerCase(),
    conf: l.Confidence || 0,
  }));

  let best = null;
  for (const rule of ISSUE_MAP) {
    const hit = lowered.find(l =>
      rule.keywords.some(k => l.name.includes(String(k).toLowerCase()))
    );
    if (hit) {
      if (!best || hit.conf > best.confidence) {
        best = {
          typeCode: rule.typeCode,
          typeName: rule.typeName,
          description: rule.description, // Arabic (stored in DynamoDB only)
          confidence: hit.conf,
        };
      }
    }
  }
  if (!best) return null;
  return {
    ...best,
    labels: labels.map(l => ({ name: l.Name, confidence: l.Confidence || 0 })),
  };
}

// Simple severity heuristic (1–5) based on issue type
function computeSeverity(issue /* may be null */) {
  if (!issue) return 2; // default low-medium
  switch (issue.typeCode) {
    case "2a": return 5; // open manhole -> critical
    case "4a": return 4; // sewage overflow -> high
    case "3a": return 3; // pothole -> medium
    case "1b": return 3; // light off / hazard -> medium
    case "1a": return 1; // light on in daytime -> low
    default:   return 2;
  }
}

// ====== Reverse geocoding ======
async function reverseGeocode(lat, lng) {
  const out = await loc.send(new SearchPlaceIndexForPositionCommand({
    IndexName: PLACE_INDEX,
    Position: [lng, lat],     // [lng, lat]
    MaxResults: 1,
    Language: "ar",
  }));
  const place = out?.Results?.[0]?.Place;
  if (!place) return null;

  const address     = place.Label || null;       // Arabic allowed in DynamoDB
  const governorate = place.Region || "";
  const city        = place.Municipality || place.SubRegion || "";
  const district    = place.Neighborhood || place.District || "";

  // regionKey prefers district, then city, then governorate
  const regionKey   = (district || city || governorate || null);

  return { address, governorate, city, district, regionKey };
}

// ====== Bedrock (Claude) short message generation ======
async function generateUserMessage({ status, issue, location }) {
  // Build a compact context the model can use (Arabic and English)
  const issueTextAr = issue?.description || "مشكلة غير مصنفة";
  const issueTextEn = issue?.typeName || "Unclassified issue";
  const addrAr      = location?.address || "";
  const regionAr    = location?.regionKey || "";
  const locLine     = [addrAr, regionAr].filter(Boolean).join(" — ");

  const systemPrompt =
    "You are a civic assistant. Produce a brief, calm, helpful message for citizens. " +
    "If Arabic is requested, use clear Modern Standard Arabic. Keep it under 160 characters. " +
    "Do not include sensitive data. If location is present, mention it naturally.";

  const userPromptAr =
    `الحالة: ${status === "APPROVED" ? "تم قبول البلاغ" : status === "REJECTED" ? "تم رفض البلاغ" : "قيد المراجعة"}.\n` +
    `الوصف: ${issueTextAr}.\n` +
    (locLine ? `الموقع: ${locLine}.` : "");

  const userPromptEn =
    `Status: ${status}. Description: ${issueTextEn}.` +
    (locLine ? ` Location: ${locLine}.` : "");

  // Anthropic messages payload for Bedrock
  const body = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 200,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: `Write TWO versions:\n1) Arabic (MSA)\n2) English.\nKeep each under 160 characters.\n\nArabic input:\n${userPromptAr}\n\nEnglish input:\n${userPromptEn}` }
        ]
      }
    ]
  };

  try {
    const res = await bed.send(new InvokeModelCommand({
      modelId: CLAUDE_MODEL,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(body)
    }));
    const json = JSON.parse(new TextDecoder().decode(res.body));

    // Claude returns { content: [ { text: "..."} ], ... }
    const fullText = json?.content?.[0]?.text || "";
    // Heuristic split into two lines if the model followed instructions
    let userAr = fullText;
    let userEn = "";
    const parts = fullText.split(/\n+/).map(s => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      // Try to detect Arabic/English lines
      const arabicLine = parts.find(p => /[\u0600-\u06FF]/.test(p)) || "";
      const englishLine = parts.find(p => !/[\u0600-\u06FF]/.test(p)) || "";
      userAr = arabicLine || fullText;
      userEn = englishLine || "";
    }

    return { userAr, userEn, modelId: CLAUDE_MODEL };
  } catch (e) {
    console.warn("⚠️ Bedrock generation failed, fallback to template:", e?.message);
    // Fallback: simple template (Arabic only)
    const fallbackAr =
      `${status === "APPROVED" ? "تم قبول البلاغ" : status === "REJECTED" ? "تم رفض البلاغ" : "البلاغ قيد المراجعة"}: ` +
      `${issueTextAr}${locLine ? ` — ${locLine}` : ""}.`;
    return { userAr: fallbackAr, userEn: "", modelId: CLAUDE_MODEL, error: "fallback" };
  }
}

function ok(msg) {
  return { statusCode: 200, body: JSON.stringify({ message: msg }) };
}

// ====== Handler ======
exports.handler = async (event) => {
  console.log("✅ S3 Event:", JSON.stringify(event, null, 2));

  const record = event?.Records?.[0];
  if (!record) return ok("No records");

  const bucket = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
  if (!key.startsWith(PENDING)) {
    console.log(`⏭️ Skip key: ${key} (not in pending/)`);
    return ok(`Skip key: ${key}`);
  }

  const reportId = key.split("/").pop().split(".")[0];
  const nowIso   = new Date().toISOString();

  // 0) Try to read existing location from DB (if generateUploadUrl wrote something)
  let lat = null, lng = null, address = null, regionKey = null;
  try {
    const get = await ddb.send(new GetCommand({ TableName: TABLE, Key: { reportId } }));
    const item = get.Item;
    if (item?.location) {
      if (Number.isFinite(item.location.lat)) lat = item.location.lat;
      if (Number.isFinite(item.location.lng)) lng = item.location.lng;
      if (typeof item.location.address === "string") address = item.location.address;
      if (typeof item.location.regionKey === "string") regionKey = item.location.regionKey;
    }
  } catch (e) {
    console.warn("⚠️ Get from DynamoDB failed:", e?.message);
  }

  // 1) Read S3 metadata/content-type as a fallback (S3 metadata is ASCII-only!)
  let contentType = "image/jpeg";
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    const meta = head.Metadata || {};
    if (!Number.isFinite(lat) && meta.lat)  lat  = Number(meta.lat);
    if (!Number.isFinite(lng) && meta.lng)  lng  = Number(meta.lng);
    if (head.ContentType) contentType = head.ContentType;
  } catch (e) {
    console.warn("⚠️ HeadObject failed:", e?.message);
  }

  // 2) Reverse geocode if we have lat/lng but missing address/regionKey
  if (Number.isFinite(lat) && Number.isFinite(lng) && (!address || !regionKey)) {
    try {
      const geo = await reverseGeocode(lat, lng);
      if (geo) {
        if (!address)   address   = geo.address || null;     // Arabic in DB
        if (!regionKey) regionKey = geo.regionKey || null;   // Arabic in DB
      }
    } catch (e) {
      console.warn("⚠️ Reverse geocoding failed:", e?.message);
    }
  }

  // Consolidate location object (for DB only; Arabic allowed here)
  const location = {};
  if (Number.isFinite(lat))  location.lat = lat;
  if (Number.isFinite(lng))  location.lng = lng;
  if (address)               location.address = address;
  if (regionKey)             location.regionKey = regionKey;
  const hasLoc = Object.keys(location).length > 0;

  // 3) Ensure base record exists (REVIEWING)
  try {
    await ddb.send(new PutCommand({
      TableName: TABLE,
      Item: {
        reportId,
        createdAt: nowIso,
        updatedAt: nowIso,
        status: "REVIEWING",
        image: { pendingKey: key },
        ...(hasLoc ? { location } : {})
      },
      ConditionExpression: "attribute_not_exists(reportId)"
    }));
    console.log(`🟡 Report ${reportId} created (REVIEWING).`);
  } catch (err) {
    console.warn(`ℹ️ Put skipped (exists?) for ${reportId}:`, err.message);
    const exprNames = { "#st": "status" };
    const exprVals  = { ":u": new Date().toISOString(), ":rev": "REVIEWING" };
    let update = "SET updatedAt=:u, #st=:rev";
    if (hasLoc) {
      update += ", #loc=:loc";
      exprNames["#loc"] = "location";
      exprVals[":loc"]  = location;
    }
    await ddb.send(new UpdateCommand({
      TableName: TABLE,
      Key: { reportId },
      UpdateExpression: update,
      ExpressionAttributeNames: exprNames,
      ExpressionAttributeValues: exprVals
    }));
  }

  // 4) Moderation (unsafe?)
  let moderationLabels = [];
  try {
    const modRes = await rek.send(new DetectModerationLabelsCommand({
      Image: { S3Object: { Bucket: bucket, Name: key } },
      MinConfidence: Math.floor(THRESH * 100),
    }));
    moderationLabels = modRes.ModerationLabels || [];
  } catch (err) {
    console.error("❌ Rekognition moderation failed:", err);
    return ok("Rekognition error");
  }

  const flagged = moderationLabels.some(l => (l.Confidence || 0) >= THRESH * 100);
  const maxConf = moderationLabels.reduce((m, l) => Math.max(m, l.Confidence || 0), 0);

  // 5) DetectLabels for issue classification (only if not flagged)
  let issue = null;
  if (!flagged) {
    try {
      const labRes = await rek.send(new DetectLabelsCommand({
        Image: { S3Object: { Bucket: bucket, Name: key } },
        MaxLabels: 20,
        MinConfidence: 60,
      }));
      const labels = labRes.Labels || [];
      issue = mapLabelsToIssue(labels); // can be null
      console.log("ℹ️ Issue mapping:", issue);
    } catch (e) {
      console.warn("⚠️ DetectLabels failed:", e?.message);
    }
  }

  // Severity (1–5) based on issue type
  const severity = computeSeverity(issue);

  // ASCII-only metadata for final S3 object (NO Arabic here)
  const finalMeta = {
    lat:       Number.isFinite(lat) ? String(lat) : "",
    lng:       Number.isFinite(lng) ? String(lng) : "",
    issuetype: issue?.typeCode || "",
  };

  // Helper to write message + severity to DynamoDB
  async function writeMsgAndSeverity({ status, extraUpdateNames = {}, extraUpdateVals = {} }) {
    // Generate user message via Bedrock
    const message = await generateUserMessage({ status, issue, location });
    // Build UpdateExpression without changing existing JSON shape
    const exprNames = { "#st": "status", "#img": "image", "#msg": "message", "#sev": "severity", ...extraUpdateNames };
    const exprVals  = { ":u": new Date().toISOString(), ":msg": message, ":sev": severity, ...extraUpdateVals };
    let update = "SET updatedAt=:u, #st=:st, #msg=:msg, #sev=:sev";
    return { exprNames, exprVals, update };
  }

  // ===== 6) Unsafe -> quarantine (REJECTED) =====
  if (flagged) {
    const destKey = `${QUARANTINE}${reportId}.jpg`;
    try {
      await s3.send(new CopyObjectCommand({
        Bucket: bucket,
        Key: destKey,
        CopySource: `/${bucket}/${key}`,
        MetadataDirective: "REPLACE",
        Metadata: finalMeta,
        ContentType: contentType,
      }));
      await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

      const { exprNames, exprVals, update } = await writeMsgAndSeverity({
        status: "REJECTED",
        extraUpdateNames: { "#mod": "moderation", "#rej": "rejection" },
        extraUpdateVals: {
          ":st": "REJECTED",
          ":img": { pendingKey: key, quarantineKey: destKey },
          ":mod": { flagged: true, maxConfidence: maxConf || 0 },
          ":r":   { code: 1 }
        }
      });

      // extend update with image/moderation/rejection (+ optional location)
      let finalUpdate = `${update}, #img=:img, #mod=:mod, #rej=:r`;
      if (hasLoc) {
        exprNames["#loc"] = "location";
        exprVals[":loc"]  = location;
        finalUpdate += ", #loc=:loc";
      }

      await ddb.send(new UpdateCommand({
        TableName: TABLE,
        Key: { reportId },
        UpdateExpression: finalUpdate,
        ExpressionAttributeNames: exprNames,
        ExpressionAttributeValues: { ...exprVals }
      }));

      console.log(`🔴 REJECTED ${reportId}`);
      return ok(`Rejected ${reportId}`);
    } catch (err) {
      console.error("❌ Reject flow failed:", err);
      return ok("Reject error");
    }
  }

  // ===== 7) Safe -> approved (APPROVED) =====
  const approvedKey = `${APPROVED}${reportId}.jpg`;
  try {
    await s3.send(new CopyObjectCommand({
      Bucket: bucket,
      Key: approvedKey,
      CopySource: `/${bucket}/${key}`,
      MetadataDirective: "REPLACE",
      Metadata: finalMeta,
      ContentType: contentType,
    }));
    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

    const { exprNames, exprVals, update } = await writeMsgAndSeverity({
      status: "APPROVED",
      extraUpdateVals: {
        ":st": "APPROVED",
        ":img": { pendingKey: key, approvedKey }
      }
    });

    // extend update with image (+ optional location + optional issue)
    let finalUpdate = `${update}, #img=:img`;
    if (hasLoc) {
      exprNames["#loc"] = "location";
      exprVals[":loc"]  = location;
      finalUpdate += ", #loc=:loc";
    }
    if (issue) {
      exprNames["#issue"] = "issue";
      exprVals[":issue"]  = issue;
      finalUpdate += ", #issue=:issue";
    }

    await ddb.send(new UpdateCommand({
      TableName: TABLE,
      Key: { reportId },
      UpdateExpression: finalUpdate,
      ExpressionAttributeNames: exprNames,
      ExpressionAttributeValues: { ...exprVals }
    }));

    console.log(`🟢 APPROVED ${reportId}`);
    return ok(`Approved ${reportId}`);
  } catch (err) {
    console.error("❌ Approve flow failed:", err);
    return ok("Approve error");
  }
};
