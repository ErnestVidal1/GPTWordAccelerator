const axios = require('axios');

async function handleChatRequest(req, res) {
    const userMessage = req.body.message;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/gpt-4/completions', {
            prompt: userMessage,
            max_tokens: 100,
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                'Content-Type': 'application/json',
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error procesando la solicitud.');
    }
}

module.exports = handleChatRequest;
