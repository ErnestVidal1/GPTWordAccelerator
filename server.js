const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
// Asegúrate de que el directorio 'public' contiene tu 'index.html'
app.use(express.static('public'));

// Ruta para manejar las solicitudes de ChatGPT
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/gpt-4/completions', {
      prompt: userMessage,
      max_tokens: 100,  // ajusta según tus necesidades
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,  // Reemplaza YOUR_OPENAI_API_KEY con tu clave de API real
        'Content-Type': 'application/json',
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error procesando la solicitud.');
  }
});

// Ruta GET adicional para manejar accesos directos a la raíz si se necesita algo específico
// Esto es opcional, pues express.static ya maneja la entrega de index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
