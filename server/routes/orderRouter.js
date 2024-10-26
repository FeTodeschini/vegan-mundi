const express = require('express');
const addOrder = require('../controllers/orderController');
const router = express.Router();

// Define relative paths for the route (based on app.use() config in Index.js)
router.post('/add', addOrder);

module.exports = router;