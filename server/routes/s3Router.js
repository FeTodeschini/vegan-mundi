const express = require('express');
const getS3Objects = require('../controllers/s3Controller');
const router = express.Router();

// Define relative paths for the route (based on app.use() config in Index.js)
router.get('/:bucket/:key', getS3Objects);

module.exports = router;