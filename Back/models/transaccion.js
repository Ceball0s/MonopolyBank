const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transaccionSchema = new Schema({
  id_transacción: {
    type: Number,
    required: true,
    unique: true
  },
  id_jugador_origen: {
    type: Number,
    required: true,
    ref: 'Jugador'
  },
  id_jugador_destino: {
    type: Number,
    required: true,
    ref: 'Jugador'
  },
  monto: {
    type: Number,
    required: true
  },
  tipo: {
    type: String,
    required: true,
    maxlength: 20
  },
  fecha_transacción: {
    type: Date,
    default: Date.now
  },
  id_partida: {
    type: Number,
    required: true,
    ref: 'Partida'
  }
}, {
  timestamps: true
});

const Transaccion = mongoose.model('Transaccion', transaccionSchema);
module.exports = Transaccion;
