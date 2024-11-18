const express = require('express');
const { addReview, getReview, getAllReviews, getClassReviews } = require('../controllers/reviewController');
const router = express.Router();

// Define relative paths for the route (based on app.use() config in Index.js)
router.post('/add', addReview);
router.get('/get', getReview);
router.get('/get-all', getAllReviews);
router.get('/get-class', getClassReviews);

module.exports = router;