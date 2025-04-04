const { app, server } = require('./app');

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

