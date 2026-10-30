const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const path = require('path');

// Target S3 bucket specified for SolveSpace job portal resumes
const S3_BUCKET = process.env.AWS_S3_BUCKET || 'jobportalbyaditya';
const AWS_REGION = process.env.AWS_REGION || 'ap-south-1';

/**
 * Initialize AWS S3 Client
 * Uses environment credentials: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
 */
function createS3Client() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (accessKeyId && secretAccessKey) {
    return new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: accessKeyId.trim(),
        secretAccessKey: secretAccessKey.trim()
      }
    });
  }

  // Fallback to default AWS SDK credential provider chain (IAM role / EC2 instance profile / ~/.aws/credentials)
  return new S3Client({ region: AWS_REGION });
}

/**
 * Check whether AWS credentials or mock mode are configured
 */
function isRealAwsConfigured() {
  const key = process.env.AWS_ACCESS_KEY_ID;
  const secret = process.env.AWS_SECRET_ACCESS_KEY;
  return !!(key && secret && key !== 'your_aws_access_key_id_here' && !key.includes('your_'));
}

/**
 * Sanitize filename to ensure clean S3 object key
 */
function sanitizeFilename(originalName) {
  const parsed = path.parse(originalName || 'resume.pdf');
  const baseName = parsed.name
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_')
    .slice(0, 40);
  return `${baseName || 'resume'}.pdf`;
}

/**
 * Validate that buffer is actually a valid PDF (header check)
 */
function validatePdfBuffer(buffer) {
  if (!buffer || buffer.length < 5) return false;
  // Standard PDF magic header is %PDF- (0x25, 0x50, 0x44, 0x46, 0x2D)
  const header = buffer.slice(0, 5).toString('ascii');
  return header.startsWith('%PDF-');
}

/**
 * Upload resume buffer to Amazon S3
 * Path: resumes/{applicationId}/{uniqueFilename}.pdf
 *
 * @param {Object} params
 * @param {Buffer} params.buffer - PDF file buffer
 * @param {string} params.originalname - Original uploaded file name
 * @param {string} params.mimetype - Uploaded MIME type
 * @param {string} params.applicationId - Unique application identifier
 * @returns {Promise<{ s3Key: string, bucket: string, size: number, filename: string }>}
 */
async function uploadResumeToS3({ buffer, originalname, mimetype, applicationId }) {
  if (!buffer) {
    throw new Error('Resume file buffer is required.');
  }

  // Validate PDF MIME type and magic bytes
  if (mimetype !== 'application/pdf' && !originalname.toLowerCase().endsWith('.pdf')) {
    throw new Error('Invalid file format. Only PDF resumes are accepted.');
  }

  if (!validatePdfBuffer(buffer)) {
    throw new Error('Invalid PDF content. The uploaded file is not a valid PDF document.');
  }

  // Max 10MB file size limit
  const MAX_SIZE = 10 * 1024 * 1024;
  if (buffer.length > MAX_SIZE) {
    throw new Error('File size exceeds the 10MB limit.');
  }

  // Generate unique filename to avoid any collision
  const safeFilename = sanitizeFilename(originalname);
  const randomSuffix = crypto.randomBytes(6).toString('hex');
  const timestamp = Date.now();
  const uniqueFilename = `${timestamp}-${randomSuffix}-${safeFilename}`;

  // S3 Key format: resumes/{applicationId}/{uniqueFilename}.pdf
  const s3Key = `resumes/${applicationId}/${uniqueFilename}`;

  // If real AWS credentials are provided, perform real S3 upload
  if (isRealAwsConfigured()) {
    try {
      const s3Client = createS3Client();
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: s3Key,
        Body: buffer,
        ContentType: 'application/pdf',
        // Resumes must be kept strictly private
        // Amazon S3 modern buckets have Block Public Access enabled by default
        Metadata: {
          'application-id': applicationId,
          'original-filename': encodeURIComponent(originalname),
          'uploaded-at': new Date().toISOString()
        }
      });

      await s3Client.send(command);
      console.log(`[AWS S3 SUCCESS] Resume uploaded to s3://${S3_BUCKET}/${s3Key} (${buffer.length} bytes)`);

      return {
        s3Key,
        bucket: S3_BUCKET,
        size: buffer.length,
        filename: uniqueFilename,
        isSimulated: false
      };
    } catch (err) {
      console.error(`[AWS S3 ERROR] Failed to upload resume to s3://${S3_BUCKET}/${s3Key}:`, err.message);
      throw new Error(`Amazon S3 upload failed: ${err.message}`);
    }
  }

  // In local development or testing environments where AWS credentials are not set,
  // check ALLOW_MOCK_S3 to allow developers to test full UI flow without AWS keys
  if (process.env.ALLOW_MOCK_S3 === 'true' || process.env.NODE_ENV === 'test') {
    console.warn(`[AWS S3 NOTICE] Real AWS credentials not set. Simulated S3 upload to s3://${S3_BUCKET}/${s3Key} (ALLOW_MOCK_S3 enabled).`);
    return {
      s3Key,
      bucket: S3_BUCKET,
      size: buffer.length,
      filename: uniqueFilename,
      isSimulated: true
    };
  }

  // If real AWS credentials are missing and mock mode is not enabled, return helpful error
  throw new Error(
    `Amazon S3 configuration error: AWS credentials (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY) ` +
    `are not configured in server/.env for bucket "${S3_BUCKET}". To test locally without active AWS credentials, set ALLOW_MOCK_S3=true in server/.env.`
  );
}

/**
 * Rollback helper: Delete uploaded resume from S3 if subsequent application record save fails
 *
 * @param {string} s3Key - S3 Object Key
 */
async function deleteResumeFromS3(s3Key) {
  if (!s3Key) return;

  if (isRealAwsConfigured()) {
    try {
      const s3Client = createS3Client();
      const command = new DeleteObjectCommand({
        Bucket: S3_BUCKET,
        Key: s3Key
      });
      await s3Client.send(command);
      console.log(`[AWS S3 ROLLBACK] Deleted orphaned resume s3://${S3_BUCKET}/${s3Key}`);
    } catch (err) {
      console.error(`[AWS S3 ROLLBACK ERROR] Could not delete orphaned file s3://${S3_BUCKET}/${s3Key}:`, err.message);
    }
  } else {
    console.log(`[AWS S3 ROLLBACK MOCK] Simulated delete of s3://${S3_BUCKET}/${s3Key}`);
  }
}

module.exports = {
  S3_BUCKET,
  AWS_REGION,
  uploadResumeToS3,
  deleteResumeFromS3,
  isRealAwsConfigured,
  sanitizeFilename,
  validatePdfBuffer
};
