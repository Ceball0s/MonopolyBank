require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Importación de rutas
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

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Conectado'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/bank', bankRoutes);

// Configuración de Socket.io
io.on('connection', (socket) => {
    console.log('🔗 Usuario conectado:', socket.id);

    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
    });

    socket.on('disconnect', () => {
        console.log('🔴 Usuario desconectado:', socket.id);
    });
});

module.exports = { app, server, io };
