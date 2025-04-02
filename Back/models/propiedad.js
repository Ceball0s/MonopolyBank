const mongoose = require('mongoose');

const propiedadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jugador',
    default: null
  },
  renta: {
    type: Number,
    required: true
  },
  hipotecada: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Propiedad', propiedadSchema);
