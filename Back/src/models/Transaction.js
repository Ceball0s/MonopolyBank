const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: false },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['bank', 'player'], required: true },
    description: { type: String, required: true },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    date: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Transaction', TransactionSchema);
