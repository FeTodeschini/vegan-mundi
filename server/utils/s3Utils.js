// Generate the pre-signed URL required for accessing private S3 objects
async function generatePreSignedUrl({ bucket, key }) {

    const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
    const { getSignedUrl }  = require("@aws-sdk/s3-request-presigner");
  
    // No need to pass the object with the region and the credentials to the S3 as this parameters were configured in AWS CLI by running the AWS CONFIGURE command in both the EC2 instance and the dev environment
    const client = new S3Client();
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const url = (await getSignedUrl(client, command));
    return JSON.stringify(url);
  }

  module.exports = generatePreSignedUrl;