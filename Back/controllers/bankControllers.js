const Propiedad = require('../models/propiedad');
const Jugador = require('../models/jugador');

// Función para comprar una propiedad
const comprarPropiedad = async (req, res) => {
const { jugadorId, propiedadId } = req.params;

try {
    const jugador = await Jugador.findById(jugadorId);
    const propiedad = await Propiedad.findById(propiedadId);

    // Verificar si el jugador tiene suficiente saldo
    if (jugador.saldo_cuenta < propiedad.precio) {
        return res.status(400).json({ message: 'Saldo insuficiente para comprar esta propiedad' });
    }

    // Verificar si la propiedad ya está comprada
    if (propiedad.propietario) {
        return res.status(400).json({ message: 'La propiedad ya tiene dueño' });
    }

    // Actualizar el saldo del jugador y asignar la propiedad
    jugador.saldo_cuenta -= propiedad.precio;
    propiedad.propietario = jugador._id;

    await jugador.save();
    await propiedad.save();

    res.status(200).json({ message: 'Compra realizada con éxito', jugador, propiedad });
} catch (error) {
    res.status(500).json({ message: 'Error al procesar la compra de propiedad', error });
}
};
// Función para pagar la renta de una propiedad
const pagarRenta = async (req, res) => {
    const { jugadorId, propiedadId } = req.params;

    try {
        const jugador = await Jugador.findById(jugadorId);
        const propiedad = await Propiedad.findById(propiedadId);

      // Verificar si la propiedad tiene propietario
        if (!propiedad.propietario) {
        return res.status(400).json({ message: 'Esta propiedad no tiene dueño' });
        }

        const propietario = await Jugador.findById(propiedad.propietario);

      // Verificar si el jugador tiene suficiente dinero para pagar la renta
        if (jugador.saldo_cuenta < propiedad.renta) {
        return res.status(400).json({ message: 'Saldo insuficiente para pagar la renta' });
        }

      // Descontar la renta del jugador y transferirla al propietario
        jugador.saldo_cuenta -= propiedad.renta;
        ropietario.saldo_cuenta += propiedad.renta;

        await jugador.save();
        await propietario.save();

        res.status(200).json({ message: 'Renta pagada con éxito', jugador, propietario, propiedad });
    } catch (error) {
        res.status(500).json({ message: 'Error al pagar la renta', error });
    }
};