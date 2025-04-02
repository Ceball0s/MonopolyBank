const Jugador = require('../models/jugador');

// Crear jugador
const crearJugador = async (req, res) => {
  const { id_jugador, nombre, saldo_cuenta, id_partida, contraseña, correo } = req.body;
  try {
    const nuevoJugador = new Jugador({ id_jugador, nombre, saldo_cuenta, id_partida, contraseña, correo });
    await nuevoJugador.save();
    res.status(201).json(nuevoJugador);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear jugador', error });
  }
};

// Obtener saldo de jugador
const obtenerSaldo = async (req, res) => {
  const { id_jugador } = req.params;
  try {
    const jugador = await Jugador.findOne({ id_jugador });
    if (!jugador) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json({ saldo_cuenta: jugador.saldo_cuenta });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener saldo', error });
  }
};

module.exports = { crearJugador, obtenerSaldo };
