const express = require('express');
const router = express.Router();
const { transferMoney, getTransactionHistory, getBalancesByGame, nextTurn } = require('../controllers/bank.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transfer-money', authMiddleware, transferMoney);
router.get('/history', authMiddleware, getTransactionHistory);
router.get('/balances/:code', authMiddleware, getBalancesByGame);
router.post('/next-turn', authMiddleware, nextTurn);

module.exports = router;
