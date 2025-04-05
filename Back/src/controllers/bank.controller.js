const Player = require('../models/Player');
const Transaction = require('../models/Transaction');
const Game = require('../models/Game');

const normalizeId = (id) => {
    if (Buffer.isBuffer(id)) {
      return id.toString('hex');
    }
    return id.toString();
  };
  
  const transferMoney = async (req, res) => {
    const { fromId, toId, amount, code } = req.body;
  const authenticatedUser = req.user;

  try {
    // Validar datos
    if (!fromId || !toId || !amount || !code) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Verificar que el usuario autenticado sea quien envía
    if (req.player.id !== String(fromId)) {
      return res.status(403).json({ message: 'No puedes enviar dinero en nombre de otro jugador' });
    }

    // Buscar el juego
    const game = await Game.findOne({ code });
    if (!game) return res.status(404).json({ message: 'Juego no encontrado' });

    // Verificar que ambos jugadores estén en el juego
    const playerIds = game.players.map(id => String(id));
    if (!playerIds.includes(fromId) || !playerIds.includes(toId)) {
      return res.status(403).json({ message: 'Ambos jugadores deben estar en el juego' });
    }

    // Verificar que sea el turno del jugador
    if (String(game.turn) !== String(fromId)) {
      return res.status(403).json({ message: 'No es tu turno' });
    }

    // Obtener ambos jugadores
    const fromPlayer = await Player.findById(fromId);
    const toPlayer = await Player.findById(toId);
    if (!fromPlayer || !toPlayer) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    // Verificar saldo
    if (fromPlayer.balance < amount) {
      return res.status(400).json({ message: 'Saldo insuficiente' });
    }

    // Realizar transacción
    fromPlayer.balance -= amount;
    toPlayer.balance += amount;

    await fromPlayer.save();
    await toPlayer.save();

    const transaction = new Transaction({
      from: fromPlayer._id,
      to: toPlayer._id,
      amount,
      gameId: game._id
    });

    await transaction.save();

    res.status(201).json({ message: 'Transacción realizada', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
  




const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('from', 'name')
            .populate('to', 'name')
            .sort({ createdAt: 1 }); // orden cronológico

        const formatted = transactions.map((tx, index) => ({
            turno: tx.turn || index + 1, // Si no hay turn, usa el orden
            de: tx.from?.name || 'Banco',
            a: tx.to?.name || 'Banco',
            cantidad: tx.amount,
            tipo: tx.type,
            fecha: tx.createdAt
        }));

        res.json({ historial: formatted });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el historial de transacciones' });
    }
};

const getBalancesByGame = async (req, res) => {
    try {
        const { code } = req.params;

        const game = await Game.findOne({ code }).populate('players');
        if (!game) {
            return res.status(404).json({ error: 'Partida no encontrada' });
        }

        const balances = game.players.map(player => ({
            id: player._id,
            name: player.name,
            balance: player.balance
        }));

        res.json({ code: game.code, actualTurn: game.turn, balances });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const nextTurn = async (req, res) => {
    try {
        const { code } = req.body;
        const game = await Game.findOne({ code, status: 'in_progress' });

        if (!game) {
            return res.status(404).json({ error: 'Partida no encontrada o no está en progreso' });
        }

        // Validar que quien hace la petición es el jugador que tiene el turno
        if (req.player.id !== String(game.turn)) {
            return res.status(403).json({ error: 'No es tu turno' });
        }

        const currentIndex = game.players.findIndex(p => String(p) === String(game.turn));
        const nextIndex = (currentIndex + 1) % game.players.length;

        game.turn = game.players[nextIndex];
        await game.save();

        const io = req.app.get("io");
        io.to(game._id.toString()).emit('turnChanged', { turn: game.turn });

        res.json({ message: 'Turno cambiado', turn: game.turn });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { transferMoney, getTransactionHistory, getBalancesByGame, nextTurn };
