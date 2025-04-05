// routes/history.routes.js
const express = require('express');
const { getTransactionHistory } = require('../controllers/history.controller');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/history/:gameId
router.get('/:gameId', auth, getTransactionHistory);

module.exports = router;
