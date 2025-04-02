const Transaccion = require('../models/transaccion');
const Jugador = require('../models/jugador');

// Función para obtener el historial de transacciones de un jugador
const obtenerHistorialTransacciones = async (req, res) => {
    const { jugadorId } = req.params;

    try {
    // Buscar todas las transacciones donde el jugador es el origen o el destino
    const transacciones = await Transaccion.find({
        $or: [
        { id_jugador_origen: jugadorId },
        { id_jugador_destino: jugadorId }
]
    })
      .populate('id_jugador_origen', 'nombre correo')  // Poblar información del jugador origen
      .populate('id_jugador_destino', 'nombre correo') // Poblar información del jugador destino
      .populate('id_partida', 'fecha_inicio estado');  // Poblar información de la partida

    if (transacciones.length === 0) {
        return res.status(404).json({ message: 'No hay transacciones registradas para este jugador' });
    }

    res.status(200).json({
        message: 'Historial de transacciones',
        transacciones
    });
} catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial de transacciones', error });
}
};

module.exports = { obtenerHistorialTransacciones };
