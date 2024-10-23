const generatePreSignedUrl = require('../utils/s3Utils');
const { CustomError } = require('../middlewares/errorHandler');

async function getS3Objects (req, res, next) {

    try {
      const clientUrl = await generatePreSignedUrl({
      bucket: `${req.params.bucket}`,
      key: `${req.params.key}`,
    });
      res.send(clientUrl);
    } catch (err) {
      console.error(err);
    }
};

module.exports = getS3Objects;