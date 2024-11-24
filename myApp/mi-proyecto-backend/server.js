const express = require('express');
const authRoutes = require('./routes/authroutes'); // Importamos las rutas
const cors = require('cors');
const axios = require('axios'); // Paquete para hacer solicitudes HTTP

const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors()); // Habilita CORS para permitir solicitudes desde el frontend

// Middleware para procesar JSON
app.use(express.json()); // Usa express.json() directamente

// Ruta para verificar el CAPTCHA
app.post('/api/verify-captcha', async (req, res) => {
  const { captchaResponse } = req.body;

  if (!captchaResponse) {
    return res.status(400).json({ error: 'No se proporcionó el CAPTCHA' });
  }

  try {
    // Verifica el CAPTCHA con la API de Google
    const secretKey = '6LfM9IcqAAAAAGhEpudlY1JID4AhnW6UkKApt7rl'; // Reemplaza con tu clave secreta de reCAPTCHA
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: captchaResponse,
        },
      }
    );

    // Si el CAPTCHA es válido
    if (response.data.success) {
      return res.json({ message: 'CAPTCHA verificado correctamente' });
    } else {
      return res.status(400).json({ error: 'Error de verificación del CAPTCHA' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error al verificar el CAPTCHA' });
  }
});

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes); // Prefijo /api/auth

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Opcional: Mostrar las rutas configuradas
console.log(app._router.stack.map(layer => layer.route && layer.route.path));
