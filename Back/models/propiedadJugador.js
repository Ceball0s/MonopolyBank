const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propiedadJugadorSchema = new Schema({
  id_jugador: {
    type: Number,
    required: true,
    ref: 'Jugador'
  },
  id_propiedades: {
    type: Number,
    required: false
  },
  hipotecada: {
    type: Boolean,
    default: false
  },
  casas: {
    type: Number,
    default: 0
  },
  hoteles: {
    type: Number,
    default: 0
  },
  id_partida: {
    type: Number,
    required: false,
    ref: 'Partida'
  }
}, {
  timestamps: true
});

const PropiedadJugador = mongoose.model('PropiedadJugador', propiedadJugadorSchema);
module.exports = PropiedadJugador;
