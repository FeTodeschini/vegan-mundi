const generatePreSignedUrl = require('../utils/s3Utils');
const { CustomError } = require('../middlewares/errorHandler');

async function getS3Objects (req, res, next) {

    try {
      const clientUrl = await generatePreSignedUrl({
        bucket: `${req.params.bucket}`,
        key: `${req.params.key}`,
    });
      // Keep response as a JSON string value for existing frontend consumers.
      res.json(clientUrl);
    } catch (err) {
      console.error('S3 pre-signed URL generation failed:', err?.message || err);
      next(new CustomError('Unable to generate S3 pre-signed URL', 502));
    }
};

module.exports = getS3Objects;