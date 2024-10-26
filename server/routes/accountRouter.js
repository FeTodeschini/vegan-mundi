const express = require('express');
const { createAccount, signIn } = require('../controllers/accountController');
const router = express.Router();

// Define relative paths for the route (based on app.use() config in Index.js)
router.post('/create', createAccount);
router.post('/signin', signIn);

module.exports = router;