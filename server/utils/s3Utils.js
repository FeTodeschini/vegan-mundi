// Generate the pre-signed URL required for accessing private S3 objects
async function generatePreSignedUrl({ bucket, key }) {

    const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
    const { getSignedUrl }  = require("@aws-sdk/s3-request-presigner");
  
    // Credentials and region are resolved from the runtime environment (for example Render env vars/IAM),
    // so S3Client can rely on the default AWS SDK provider chain.
    const client = new S3Client({ region: process.env.AWS_REGION });
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const url = (await getSignedUrl(client, command));
    return url;
  }

  module.exports = generatePreSignedUrl;