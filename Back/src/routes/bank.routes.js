const express = require('express');
const router = express.Router();
const { transferMoney, getTransactionHistory, getBalancesByGame } = require('../controllers/bank.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transfer-money', authMiddleware, transferMoney);
router.get('/history', authMiddleware, getTransactionHistory);
router.get('/balances/:code', authMiddleware, getBalancesByGame);

module.exports = router;
