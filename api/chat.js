const axios = require('axios');
require('dotenv').config(); // Asegúrate de que las variables de entorno estén cargadas

async function handleChatRequest(req, res) {
    const userMessage = req.body.message;
    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
        return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4o",
            messages: [{role: "user", content: userMessage}]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Usar la clave de API desde .env
                'Content-Type': 'application/json',
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        if (error.response) {
            // La API de OpenAI devolvió un error
            console.log('Datos del error:', error.response.data);
            console.log('Estado del error:', error.response.status);
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.log('Error de solicitud:', error.request);
            res.status(503).send('Error de servicio: Servicio no disponible.');
        } else {
            // Algo más causó un error
            console.log('Error:', error.message);
            res.status(500).send('Error interno del servidor.');
        }
    }
}

module.exports = handleChatRequest;
