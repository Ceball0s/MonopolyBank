
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jugadorSchema = new Schema({
  id_jugador: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true,
    maxlength: 255
  },
  saldo_cuenta: {
    type: Number,
    required: true
  },
  id_partida: {
    type: Number,
    required: true
  },
  contraseña: {
    type: String,
    required: true,
    maxlength: 50
  },
  correo: {
    type: String,
    required: true,
    maxlength: 50
  }, 
  id_partida: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partida'
}, 
  timestamps: true // Para registrar la fecha de creación y actualización automáticamente
});

const Jugador = mongoose.model('Jugador', jugadorSchema);
module.exports = Jugador;
