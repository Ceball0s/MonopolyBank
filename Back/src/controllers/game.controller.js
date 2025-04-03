const Turn = require('../models/Turn');
const Player = require('../models/Player');
const Game = require('../models/Game');
const io = require('../server').io;
const crypto = require('crypto');

const createGame = async (req, res) => {
    try {
        const { maxPlayers } = req.body;
        if (maxPlayers < 2 || maxPlayers > 8) {
            return res.status(400).json({ error: 'El número de jugadores debe ser entre 2 y 8' });
        }
        const code = crypto.randomBytes(3).toString('hex'); // Código de 6 caracteres
        const player = await Player.findById(req.player.id);
        if (!player) return res.status(404).json({ error: 'Jugador no encontrado' });

        const game = new Game({ code, players: [player._id], maxPlayers });
        await game.save();

        res.json({ message: 'Partida creada', game });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const joinGame = async (req, res) => {
    try {
        const { code } = req.body;
        const player = await Player.findById(req.player.id);
        if (!player) return res.status(404).json({ error: 'Jugador no encontrado' });

        const game = await Game.findOne({ code, status: 'waiting' });
        if (!game) return res.status(404).json({ error: 'Partida no encontrada o ya en progreso' });

        if (game.players.includes(player._id)) return res.status(400).json({ error: 'Ya estás en esta partida' });

        if (game.players.length >= game.maxPlayers) {
            return res.status(400).json({ error: 'La partida ya ha alcanzado el número máximo de jugadores' });
        }
        game.players.push(player._id);
        await game.save();

        io.to(game._id.toString()).emit('playerJoined', { player: player.name });
        res.json({ message: 'Unido a la partida', game });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const listGames = async (req, res) => {
    try {
        const games = await Game.find().populate('players', 'name');
        res.json(games);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const registerTurn = async (req, res) => {
    try {
        const { gameId, action } = req.body;
        const player = await Player.findById(req.player.id);
        const game = await Game.findById(gameId);

        if (!player || !game) return res.status(404).json({ error: 'Jugador o partida no encontrados' });

        const turnCount = await Turn.countDocuments({ game: gameId });
        const turn = new Turn({ game: gameId, player: player._id, turnNumber: turnCount + 1, action });
        await turn.save();

        // Emitir evento a todos los jugadores de la partida
        io.to(gameId.toString()).emit('turnUpdate', { player: player.name, action });

        res.json({ message: 'Turno registrado', turn });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const startGame = async (req, res) => {
    try {
        const { code } = req.body;
        const game = await Game.findOne({ code, status: 'waiting' });
        if (!game) return res.status(404).json({ error: 'Partida no encontrada o ya en progreso' });

        if (game.players.length < 2) {
            return res.status(400).json({ error: 'Se necesitan al menos 2 jugadores para iniciar' });
        }

        game.status = 'in_progress';
        game.turn = game.players[0];
        await game.save();

        io.to(game._id.toString()).emit('gameStarted', { game });
        res.json({ message: 'Partida iniciada', game });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const nextTurn = async (req, res) => {
    try {
        const { code } = req.body;
        const game = await Game.findOne({ code, status: 'in_progress' });
        if (!game) return res.status(404).json({ error: 'Partida no encontrada o no está en progreso' });

        const currentIndex = game.players.indexOf(game.turn);
        const nextIndex = (currentIndex + 1) % game.players.length;
        game.turn = game.players[nextIndex];
        await game.save();

        io.to(game._id.toString()).emit('turnChanged', { turn: game.turn });
        res.json({ message: 'Turno cambiado', game });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { createGame, joinGame, listGames, registerTurn, startGame, nextTurn, };
