const Player = require('../models/Player');
const Transaction = require('../models/Transaction');

const transferMoney = async (req, res) => {
    try {
        const { fromId, toId, amount } = req.body;
        if (amount <= 0) return res.status(400).json({ error: 'Cantidad inválida' });

        const fromPlayer = await Player.findById(fromId);
        const toPlayer = await Player.findById(toId);
        if (!fromPlayer || !toPlayer) return res.status(404).json({ error: 'Jugador no encontrado' });

        if (fromPlayer.balance < amount) return res.status(400).json({ error: 'Fondos insuficientes' });

        fromPlayer.balance -= amount;
        toPlayer.balance += amount;
        await fromPlayer.save();
        await toPlayer.save();

        const transaction = new Transaction({ from: fromId, to: toId, amount, type: 'transfer' });
        await transaction.save();

        io.emit('moneyTransferred', { from: fromId, to: toId, amount });
        res.json({ message: 'Transferencia realizada', transaction });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { transferMoney, payRent };
