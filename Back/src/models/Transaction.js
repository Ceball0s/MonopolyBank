// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  amount: Number,
  type: { type: String, enum: ['transfer', 'reward', 'fine'], default: 'transfer' },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  turnNumber: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
