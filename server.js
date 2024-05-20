const express = require('express');
const handleChatRequest = require('./api/chat'); // Ajusta la ruta según la estructura de tu proyecto
require('dotenv').config(); // Cargar las variables de entorno

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta para manejar las solicitudes de ChatGPT
app.post('/api/chat', handleChatRequest);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
