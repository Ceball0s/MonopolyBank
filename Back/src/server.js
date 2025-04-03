require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth.routes');
const gameRoutes = require('./routes/game.routes');
const bankRoutes = require('./routes/bank.routes');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado')).catch(err => console.error(err));

// Rutas
app.use('/auth', authRoutes);
app.use('/game', gameRoutes);
app.use('/bank', bankRoutes);
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);
    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
