const express = require('express');
const getGallery = require('../controllers/galleryController');
const router = express.Router();

// Define relative paths for the route (based on app.use() config in Index.js)
router.get('/', getGallery);

module.exports = router;