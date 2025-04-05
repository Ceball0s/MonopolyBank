const Transaction = require('../models/Transaction');
const Player = require('../models/Player');
const Game = require('../models/Game');

const getTransactionHistory = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findOne({ code: gameId });
    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    const transactions = await Transaction.find({ gameId: game._id })
      .populate('from', 'name')
      .populate('to', 'name')
      .sort({ createdAt: 1 });

    const formatted = transactions.map(tx => ({
      from: tx.from ? tx.from.name : 'Banco',
      to: tx.to ? tx.to.name : 'Banco',
      amount: tx.amount,
      type: tx.type,
      turn: tx.turnNumber ?? 'Desconocido',
      date: tx.createdAt.toLocaleString()
    }));

    res.json({ history: formatted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTransactionHistory };