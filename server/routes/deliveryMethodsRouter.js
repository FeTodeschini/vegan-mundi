const express = require('express');
const getDeliveryMethods = require('../controllers/deliveryMethodsController');
const router = express.Router();

// Define relative paths for the route (based on app.use() config in Index.js)
router.get('/', getDeliveryMethods);

module.exports = router;