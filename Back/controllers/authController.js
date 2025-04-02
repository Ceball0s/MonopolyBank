const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Jugador = require('../models/jugador');

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const jugador = await Jugador.findOne({ correo });
    if (!jugador) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    const esValido = await bcrypt.compare(contraseña, jugador.contraseña);
    if (!esValido) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id_jugador: jugador.id_jugador }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error de autenticación', error });
  }
};

module.exports = { login };
