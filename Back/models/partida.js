const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidaSchema = new Schema({
  id_partida: {
    type: Number,
    required: true,
    unique: true
  },
  fecha_inicio: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    required: 'En progreso',
    maxlength: 15
  }
}, {
  timestamps: true
});

const Partida = mongoose.model('Partida', partidaSchema);
module.exports = Partida;
