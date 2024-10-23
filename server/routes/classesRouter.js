const express = require('express');
const { getCategories, getFreeClasses, getClassesPerCategory, getClassesPerKeyword, persistClasses } = require('../controllers/classesController');
const router = express.Router();

// Define relative paths for the route (based on app.use() config in Index.js)
router.get('/categories', getCategories);
router.get('/free', getFreeClasses);
router.get('/category/:category', getClassesPerCategory);
router.get('/filter/:keyword', getClassesPerKeyword);
router.post('/persist', persistClasses);

module.exports = router;