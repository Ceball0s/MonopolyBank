const mongoose = require('mongoose');

const TurnSchema = new mongoose.Schema({
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    turnNumber: { type: Number, required: true },
    action: { type: String, required: true } 
});

module.exports = mongoose.model('Turn', TurnSchema);
