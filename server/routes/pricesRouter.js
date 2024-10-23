const express = require('express');
const getPrices = require('../controllers/pricesController');
const router = express.Router();

// Define relative paths for the route (based on app.use() config in Index.js)
router.get('/', getPrices);

module.exports = router;