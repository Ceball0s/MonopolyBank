
const Player = require('../models/Player');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingPlayer = await Player.findOne({ email });
        if (existingPlayer) return res.status(400).json({ error: 'El email ya está registrado' });
        
        const newPlayer = new Player({ name, email, password });
        await newPlayer.save();
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const player = await Player.findOne({ email });
        if (!player) return res.status(400).json({ error: 'Credenciales incorrectas' });
        
        const isMatch = await bcrypt.compare(password, player.password);
        if (!isMatch) return res.status(400).json({ error: 'Credenciales incorrectas' });
        
        const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, player: { id: player._id, name: player.name, email: player.email } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { register, login };