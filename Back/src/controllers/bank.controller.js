const Player = require('../models/Player');
const Transaction = require('../models/Transaction');
const Game = require('../models/Game');

const transferMoney = async (req, res) => {
    try {
        const { fromId, toId, amount, code } = req.body;
        if (amount <= 0) return res.status(400).json({ error: 'Cantidad inválida' });

        //const game = await Game.findById(gameId);
        const game = await Game.findOne({ code, status: 'in_progress' });
        if (!game) return res.status(404).json({ error: 'Juego no encontrado' });

        let balancesRaw = game.players || []; // array de objetos con id, name y balance

        const balances = Object.fromEntries(
            balancesRaw.map((b, index) => [b.id.toString()])
        );
        
        console.log(balancesRaw, balances);
        // Validar fondos suficientes si el origen no es el banco
        if (fromId !== "Banco") {
            if (!(fromId in balances)) return res.status(404).json({ error: 'Jugador de origen no está en el juego' });
            if (balances[fromId] < amount) return res.status(400).json({ error: 'Fondos insuficientes' });
        }

        // Validar si el jugador destino está en el juego (si no es banco)
        if (toId !== "Banco" && !(toId in balances)) {
            return res.status(404).json({ error: 'Jugador de destino no está en el juego' });
        }

        // No permitir transferirse a sí mismo
        if (fromId === toId) return res.status(400).json({ error: 'No puedes transferir dinero a ti mismo' });

        // Realizar transferencia dentro del estado del juego
        if (fromId !== "Banco") balances[fromId] -= amount;
        if (toId !== "Banco") {
            balances[toId] = (balances[toId] || 0) + amount;
        }

        game.balances = balances;
        await game.save();

        // Guardar transacción
        const transaction = new Transaction({
            from: fromId === "Banco" ? null : fromId,
            to: toId === "Banco" ? null : toId,
            amount,
            type: 'transfer',
            game: gameId,
        });
        await transaction.save();

        io.emit('moneyTransferred', { from: fromId, to: toId, amount, gameId });

        res.json({ message: 'Transferencia realizada', transaction });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('from', 'name')
            .populate('to', 'name')
            .sort({ createdAt: 1 }); // orden cronológico

        const formatted = transactions.map((tx, index) => ({
            turno: tx.turn || index + 1, // Si no hay turn, usa el orden
            de: tx.from?.name || 'Banco',
            a: tx.to?.name || 'Banco',
            cantidad: tx.amount,
            tipo: tx.type,
            fecha: tx.createdAt
        }));

        res.json({ historial: formatted });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el historial de transacciones' });
    }
};

const getBalancesByGame = async (req, res) => {
    try {
        const { code } = req.params;

        const game = await Game.findOne({ code }).populate('players');
        if (!game) {
            return res.status(404).json({ error: 'Partida no encontrada' });
        }

        const balances = game.players.map(player => ({
            id: player._id,
            name: player.name,
            balance: player.balance
        }));

        res.json({ code: game.code, actualTurn: game.turn, balances });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const nextTurn = async (req, res) => {
    try {
        const { code } = req.body;
        const game = await Game.findOne({ code, status: 'in_progress' });

        if (!game) {
            return res.status(404).json({ error: 'Partida no encontrada o no está en progreso' });
        }

        // Validar que quien hace la petición es el jugador que tiene el turno
        if (req.player.id !== String(game.turn)) {
            return res.status(403).json({ error: 'No es tu turno' });
        }

        const currentIndex = game.players.findIndex(p => String(p) === String(game.turn));
        const nextIndex = (currentIndex + 1) % game.players.length;

        game.turn = game.players[nextIndex];
        await game.save();

        const io = req.app.get("io");
        io.to(game._id.toString()).emit('turnChanged', { turn: game.turn });

        res.json({ message: 'Turno cambiado', turn: game.turn });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { transferMoney, getTransactionHistory, getBalancesByGame, nextTurn };
