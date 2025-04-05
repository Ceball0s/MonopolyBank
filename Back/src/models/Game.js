const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }, // 👈 este es nuevo
    started: { type: Boolean, default: false },
    code: { type: String, unique: true, required: true },
    status: { type: String, enum: ['waiting', 'in_progress', 'finished'], default: 'waiting' },
    turn: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
  });
  

module.exports = mongoose.model('Game', GameSchema);
