const express = require('express');
const router = express.Router();
const { transferMoney, payRent } = require('../controllers/bank.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transfer-money', authMiddleware, transferMoney);

module.exports = router;
