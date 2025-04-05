const Turn = require('../models/Turn');
const Player = require('../models/Player');
const Game = require('../models/Game');
//const io = require('../server').io;
//const io = req.app.get("io");
const crypto = require('crypto');

const createGame = async (req, res) => {
  try {
    const { maxPlayers } = req.body;
    if (maxPlayers < 2 || maxPlayers > 8) {
      return res.status(400).json({ error: 'El número de jugadores debe ser entre 2 y 8' });
    }

    const player = await Player.findById(req.player.id);
    if (!player) return res.status(404).json({ error: 'Jugador no encontrado' });

    // 🔍 Buscar si ya existe un juego donde este jugador es el admin
    const existingGame = await Game.findOne({ admin: player._id, status: 'waiting' });

    if (existingGame) {
      await Game.deleteOne({ _id: existingGame._id }); // ❌ Borrar la sala anterior
    }

    const code = crypto.randomBytes(3).toString('hex');

    // ✅ Crear nueva sala
    const game = new Game({
      code,
      admin: player._id,
      players: [player._id], // ¡Ojo! Aquí estaba el error antes: estabas guardando `player.name`
      maxPlayers
    });

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

    // Si ya está en la partida, simplemente responde con el estado actual del juego
    if (game.players.includes(player._id)) {
      return res.json({ message: 'Ya estás en esta partida', game });
    }

    if (game.players.length >= game.maxPlayers) {
      return res.status(400).json({ error: 'La partida ya ha alcanzado el número máximo de jugadores' });
    }

    game.players.push(player._id);
    await game.save();
    // const io = req.app.get("io");
    const io = req.app.get("io");
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

const getGameById = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId).populate('players', 'name');

    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getGameByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const game = await Game.findOne({ code }).populate('players', 'name');

    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    res.json(game);
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

    const io = req.app.get("io");
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

    // Verificar que el jugador actual sea el admin
    if (game.admin.toString() !== req.player.id) {
      return res.status(403).json({ error: 'Solo el administrador puede iniciar la partida' });
    }

    if (game.players.length < 2) {
        return res.status(400).json({ error: 'Se necesitan al menos 2 jugadores para iniciar' });
    }

    game.status = 'in_progress';
    game.started = true;
    game.turn = game.players[0];
    game.players.forEach(player => {
      player.balance = 1500; // Inicializar saldo de cada jugador
    });
    await game.save();
    const io = req.app.get("io");
    // const io = req.app.get("io");
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
    const io = req.app.get("io");
    io.to(game._id.toString()).emit('turnChanged', { turn: game.turn });
    res.json({ message: 'Turno cambiado', game });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createGame, joinGame, listGames, registerTurn, startGame, nextTurn, getGameById, getGameByCode };
