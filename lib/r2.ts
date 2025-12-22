import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Lazy initialization to avoid throwing at module load time
let _r2Client: S3Client | null = null;

function getEnvVars() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;

  const missing: string[] = [];
  if (!accountId) missing.push('R2_ACCOUNT_ID');
  if (!accessKeyId) missing.push('R2_ACCESS_KEY_ID');
  if (!secretAccessKey) missing.push('R2_SECRET_ACCESS_KEY');
  if (!bucket) missing.push('R2_BUCKET_NAME');

  if (missing.length > 0) {
    throw new Error(`Missing Cloudflare R2 environment variables: ${missing.join(', ')}`);
  }

  return { accountId: accountId!, accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey!, bucket: bucket! };
}

export function getR2Client() {
  if (!_r2Client) {
    const { accountId, accessKeyId, secretAccessKey } = getEnvVars();
    _r2Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
    });
  }
  return _r2Client;
}

export async function getR2ObjectStream(key: string) {
  const { bucket } = getEnvVars();
  const client = getR2Client();
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const result = await client.send(command);
  const body = result.Body as any;
  const contentType = result.ContentType || "application/octet-stream";
  const contentLength = result.ContentLength || undefined;
  const lastModified = result.LastModified?.toUTCString();

  return { body, contentType, contentLength, lastModified };
}

export async function getR2SignedUrl(key: string, expiresInSeconds = 900) {
  const { bucket } = getEnvVars();
  const client = getR2Client();
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const signedUrl = await getSignedUrl(client, command, { expiresIn: expiresInSeconds });
  return signedUrl;
}

export async function putR2Object(
  key: string,
  body: any,
  contentType?: string,
  cacheControl?: string,
) {
  const { accountId, accessKeyId, secretAccessKey, bucket } = getEnvVars();

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: cacheControl,
  });

  await client.send(command);
  return { bucket, key };
}