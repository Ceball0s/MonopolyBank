const express = require('express');
const router = express.Router();
const { transferMoney, getTransactionHistory } = require('../controllers/bank.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transfer-money', authMiddleware, transferMoney);
router.get('/history', authMiddleware, getTransactionHistory);

module.exports = router;
