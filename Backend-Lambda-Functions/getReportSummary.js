// getReportSummary (CommonJS, Node.js 20, AWS SDK v3)
// Returns an Arabic summary based on Reports table.
// Optional: reads RoutingRules if ROUTING_TABLE is set.

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const REGION        = process.env.AWS_REGION || "us-west-2";
const TABLE_NAME    = process.env.TABLE_NAME || "Reports";
const ROUTING_TABLE = process.env.ROUTING_TABLE || ""; // optional

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }));

// Arabic display names for issue types
const ISSUE_NAME_AR = {
  "1a": "عمود إنارة مضاء نهارًا",
  "1b": "عمود إنارة مطفأ/خطر ليلًا",
  "2a": "بلاعة مفتوحة/مرتفعة",
  "3a": "تكسر/نقرة في الطريق",
  "4a": "طفح/تسريب صرف صحي",
  "NONE": "غير مُصنّف"
};

// ---- Severity helpers (1..3) ----
// Maps any numeric-like value to 1..3 + Arabic word
function mapSeverity(scoreLike) {
  const s = Math.max(1, Math.min(3, Math.round(Number(scoreLike) || 1)));
  const word = s === 1 ? 'منخفضة' : s === 2 ? 'متوسطة' : 'عالية';
  return { severityScore: s, severityWord: word };
}

// Heuristic fallback if no explicit severity was saved in DB
function inferSeverityFromIssue(issue) {
  if (!issue?.typeCode) return 2; // medium by default
  switch (String(issue.typeCode).toLowerCase()) {
    case '1a': return 1; // daytime light -> low
    case '1b': return 2; // light off/hazard potential -> medium
    case '2a': return 3; // open manhole -> high
    case '3a': return 2; // road crack/pothole -> medium
    case '4a': return 3; // sewage overflow -> high
    default:   return 2;
  }
}

// ---- Region -> email helper (fallback) ----
function arabicToSlug(input = '') {
  const map = {
    'أ':'a','ا':'a','إ':'i','آ':'a','ء':'','ؤ':'u','ئ':'i',
    'ب':'b','ت':'t','ث':'th','ج':'g','ح':'h','خ':'kh',
    'د':'d','ذ':'th','ر':'r','ز':'z','س':'s','ش':'sh',
    'ص':'s','ض':'d','ط':'t','ظ':'z','ع':'a','غ':'gh',
    'ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n',
    'ه':'h','و':'w','ي':'y','ى':'a','ة':'a'
  };
  const latin = Array.from(input).map(ch => map[ch] ?? ch).join('');
  return latin
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function buildAuthorityEmail(regionKey, fallback = 'dep@gov.eg') {
  if (!regionKey) return fallback;
  const slug = arabicToSlug(String(regionKey));
  return slug ? `dep@${slug}.gov.eg` : fallback;
}

// ---- Message builder ----
function buildMessage(item, authorityName, authorityEmailFallback) {
  const status = item?.status || "UNKNOWN";
  const issue  = item?.issue || null;
  const loc    = item?.location || {};
  const addr   = loc?.address ? String(loc.address) : null;
  const region = loc?.regionKey ? String(loc.regionKey) : null;
  const lat    = Number.isFinite(loc?.lat) ? String(loc.lat) : null;
  const lng    = Number.isFinite(loc?.lng) ? String(loc.lng) : null;

  const lines = [];

  if (status === "PENDING_UPLOAD" || status === "REVIEWING") {
    lines.push("بلاغك قيد المعالجة…");
    if (addr)   lines.push(`العنوان: ${addr}`);
    if (region) lines.push(`المنطقة: ${region}`);
    if (lat && lng) lines.push(`الإحداثيات: ${lat}, ${lng}`);
    return lines.join("\n");
  }

  if (status === "REJECTED") {
    const code = item?.rejection?.code ?? 0;
    if (code === 1) lines.push("تم رفض البلاغ: الصورة تحتوي على محتوى غير مسموح.");
    else            lines.push("تم رفض البلاغ: الصورة غير صالحة.");
    if (addr)   lines.push(`العنوان: ${addr}`);
    if (region) lines.push(`المنطقة: ${region}`);
    if (lat && lng) lines.push(`الإحداثيات: ${lat}, ${lng}`);
    return lines.join("\n");
  }

  if (status === "APPROVED") {
    if (!issue || issue.typeCode === "NONE") {
      lines.push("الصورة لا تبدو مرتبطة بنوع شكوى مدعوم لدينا حاليًا.");
      if (addr)   lines.push(`العنوان: ${addr}`);
      if (region) lines.push(`المنطقة: ${region}`);
      if (lat && lng) lines.push(`الإحداثيات: ${lat}, ${lng}`);
      return lines.join("\n");
    }

    const typeCode   = String(issue.typeCode);
    const typeNameAr = ISSUE_NAME_AR[typeCode] || typeCode;
    const desc       = issue.description ? String(issue.description) : typeNameAr;

    // severity: prefer saved score; else infer
    const rawSeverity = (typeof issue.severityScore === "number")
      ? issue.severityScore
      : inferSeverityFromIssue(issue);
    const { severityScore, severityWord } = mapSeverity(rawSeverity);

    lines.push(`نوع الشكوى: ${typeCode} – ${typeNameAr}`);
    lines.push(`وصف الشكوى: ${desc}`);
    lines.push(`تقييم الخطر: ${severityWord} (${severityScore}/3)`);
    if (addr)   lines.push(`العنوان: ${addr}`);
    if (region) lines.push(`المنطقة: ${region}`);
    if (lat && lng) lines.push(`الإحداثيات: ${lat}, ${lng}`);

    const toEmail = authorityEmailFallback || buildAuthorityEmail(region);
    // keep the last sentence structure similar to your original line
    if (authorityName) lines.push(`تم إرسال البلاغ إلى: ${toEmail}`);
    else               lines.push(`تم إرسال البلاغ إلى: ${toEmail}`);
    return lines.join("\n");
  }

  return "حدث خطأ غير متوقع. برجاء المحاولة لاحقًا.";
}

// Optional: query RoutingRules (PK: regionKey, SK: issueTypeCode)
// Returns { name, email } or undefined
async function findAuthority(regionKey, issueTypeCode) {
  if (!ROUTING_TABLE || !regionKey || !issueTypeCode) return undefined;
  try {
    const q = await ddb.send(new QueryCommand({
      TableName: ROUTING_TABLE,
      KeyConditionExpression: "regionKey = :r AND issueTypeCode = :i",
      ExpressionAttributeValues: { ":r": regionKey, ":i": issueTypeCode },
      Limit: 1
    }));
    const rule = q.Items && q.Items[0];
    if (!rule || rule.active === false) return undefined;
    return {
      name:  String(rule.authorityName || ""),
      email: String(rule.authorityEmail || "")
    };
  } catch {
    return undefined;
  }
}

function corsHeaders(extra = {}) {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    ...extra
  };
}

function response(statusCode, data, extraHeaders) {
  return {
    statusCode,
    headers: corsHeaders(extraHeaders),
    body: JSON.stringify(data)
  };
}

exports.handler = async (event) => {
  try {
    // CORS preflight
    if (event?.requestContext?.http?.method === "OPTIONS") {
      return {
        statusCode: 204,
        headers: corsHeaders()
      };
    }

    const reportId =
      event?.pathParameters?.reportId ||
      event?.queryStringParameters?.reportId ||
      (event?.body ? (() => { try { return JSON.parse(event.body).reportId; } catch { return undefined; } })() : undefined);

    if (!reportId) {
      return response(400, { ready: false, message: "يجب تمرير reportId.", retryAfterSec: 2 });
    }

    // Read report
    const get = await ddb.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { reportId }
    }));
    const item = get.Item;

    if (!item) {
      return response(200, {
        ready: false,
        status: "PENDING_UPLOAD",
        message: "لم نعثر على هذا البلاغ بعد. جاري الإنشاء…",
        retryAfterSec: 2,
        reportId
      });
    }

    // Optional routing lookup
    const regionKey = item?.location?.regionKey ? String(item.location.regionKey) : undefined;
    const typeCode  = item?.issue?.typeCode ? String(item.issue.typeCode) : undefined;
    const routingInfo = await findAuthority(regionKey, typeCode);

    const authorityName  = routingInfo?.name;
    const authorityEmail = routingInfo?.email || (regionKey ? buildAuthorityEmail(regionKey) : undefined);

    const message = buildMessage(item, authorityName, authorityEmail);

    const status = item.status || "UNKNOWN";
    const ready  = (status === "APPROVED" || status === "REJECTED");

    const payload = {
      ready,
      retryAfterSec: ready ? undefined : 2,
      reportId,
      status,
      message
    };

    if (item.issue) {
      // keep existing shape (do not add new fields unless already present)
      payload.issue = {
        typeCode: item.issue.typeCode || "NONE",
        description: item.issue.description || (ISSUE_NAME_AR[item.issue.typeCode || "NONE"] || "غير مُصنّف"),
        confidence: (typeof item.issue.confidence === "number") ? item.issue.confidence : undefined
        // NOTE: we intentionally do NOT add severityScore here to keep the response shape unchanged
      };
    }

    if (item.location) {
      payload.location = {
        address: item.location.address,
        regionKey: item.location.regionKey,
        lat: item.location.lat,
        lng: item.location.lng
      };
    }

    payload.routing = {
      simulated: true,
      ...(authorityName ? { authorityName } : {})
    };

    payload.updatedAt = item.updatedAt;

    return response(200, payload);

  } catch (err) {
    console.error("getReportSummary error", err);
    return response(200, {
      ready: false,
      status: "UNKNOWN",
      message: "حدث خطأ أثناء معالجة البلاغ. حاول لاحقًا.",
      retryAfterSec: 3
    });
  }
};
