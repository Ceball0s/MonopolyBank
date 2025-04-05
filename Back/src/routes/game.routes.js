
const express = require('express');
const router = express.Router();
const { createGame, joinGame, listGames } = require('../controllers/game.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { registerTurn, startGame, nextTurn, getGameById, getGameByCode } = require('../controllers/game.controller');



router.post('/create', authMiddleware, createGame);
router.post('/join', authMiddleware, joinGame);
router.get('/list', authMiddleware, listGames);
router.post('/turn', authMiddleware, registerTurn);
router.post('/start', authMiddleware, startGame);
router.post('/next-turn', authMiddleware, nextTurn);
router.get('/id/:gameId', authMiddleware, getGameById);
router.get('/code/:code', authMiddleware, getGameByCode);

module.exports = router;