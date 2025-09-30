// index.js (Node.js 20 + AWS SDK v2 via Lambda layer)
// Generates a presigned S3 PUT URL without metadata headers.
// Also writes a minimal report record to DynamoDB with optional location.

const AWS = require('aws-sdk');
const s3  = new AWS.S3({ signatureVersion: 'v4', region: process.env.AWS_REGION || 'us-west-2' });
const ddb = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION || 'us-west-2' });

const BUCKET          = process.env.BUCKET_NAME;
const PENDING_PREFIX  = process.env.PENDING_PREFIX || 'pending/';
const EXPIRES         = Number(process.env.PRESIGNED_EXPIRES || 300);
const TABLE           = process.env.TABLE_NAME || 'Reports';
const ALLOWED         = (process.env.ALLOWED_MIME || 'image/jpeg,image/png')
  .split(',')
  .map(s => s.trim());

exports.handler = async (event) => {
  try {
    const body = event?.body ? JSON.parse(event.body) : {};
    const { mimeType = 'image/jpeg', lat = null, lng = null, address = null } = body;

    // Validate mime
    if (!ALLOWED.includes(mimeType)) {
      return respond(400, { error: `mimeType must be one of: ${ALLOWED.join(', ')}` });
    }

    // Generate ids/keys
    const ext = mimeType === 'image/png' ? 'png' : 'jpg';
    const reportId =
      (global.crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const objectKey = `${PENDING_PREFIX}${reportId}.${ext}`;
    const now = new Date().toISOString();

    // Create a minimal record in DynamoDB (location is optional)
    try {
      const item = {
        reportId,
        status: 'PENDING_UPLOAD',
        createdAt: now,
        updatedAt: now,
        image: { pendingKey: objectKey }
      };
      if (lat != null && lng != null) item.location = { lat, lng };
      if (address) item.address = address;

      await ddb.put({
        TableName: TABLE,
        Item: item,
        ConditionExpression: 'attribute_not_exists(reportId)'
      }).promise();
    } catch (e) {
      // If record already exists, just continue (processImage may have created it)
      if (e.code !== 'ConditionalCheckFailedException') throw e;
    }

    // Build presigned PUT URL (NO custom metadata)
    const params = {
      Bucket: BUCKET,
      Key: objectKey,
      Expires: EXPIRES,
      ContentType: mimeType
    };
    const uploadUrl = s3.getSignedUrl('putObject', params);

    // Respond
    return respond(201, {
      reportId,
      bucket: BUCKET,
      objectKey,
      uploadUrl,
      expiresInSeconds: EXPIRES,
      requiredHeaders: { 'Content-Type': mimeType } // only
    });

  } catch (err) {
    console.error('generateUploadUrl error', err);
    return respond(500, { error: 'Internal error' });
  }
};

function respond(statusCode, data) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data)
  };
}
