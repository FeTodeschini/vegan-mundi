const express = require('express');
const { getCategories, getFreeClasses, getClassesPerCategory, getClassesPerKeyword } = require('../controllers/classController');
const router = express.Router();

// Define relative paths for the route (based on app.use() config in Index.js)
router.get('/categories', getCategories);
router.get('/free', getFreeClasses);
router.get('/category/:category', getClassesPerCategory);
router.get('/filter/:keyword', getClassesPerKeyword);

module.exports = router;