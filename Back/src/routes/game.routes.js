
const express = require('express');
const router = express.Router();
const { createGame, joinGame, listGames } = require('../controllers/game.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { registerTurn, startGame, nextTurn } = require('../controllers/game.controller');



router.post('/create', authMiddleware, createGame);
router.post('/join/:gameId', authMiddleware, joinGame);
router.get('/list', authMiddleware, listGames);
router.post('/turn', authMiddleware, registerTurn);
router.post('/start', authMiddleware, startGame);
router.post('/next-turn', authMiddleware, nextTurn);

module.exports = router;