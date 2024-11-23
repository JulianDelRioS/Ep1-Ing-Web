const express = require('express');
const { Client } = require('pg');
const cors = require('cors');  
const axios = require('axios'); // Para hacer solicitudes HTTP

const app = express();
const port = 3000;

// Configuración de conexión a PostgreSQL
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Jdr2965646',
  database: 'marketlink'
});

// Conectar a PostgreSQL
client.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch(err => console.error("Error de conexión", err));

// Habilitar CORS
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Tu clave secreta de reCAPTCHA
const RECAPTCHA_SECRET_KEY = "6LfM9IcqAAAAAGhEpudlY1JID4AhnW6UkKApt7rl";

// Endpoint para login con validación de reCAPTCHA
app.post('/login', async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  if (!email || !password || !recaptchaToken) {
    return res.status(400).json({ success: false, message: "Email, contraseña y reCAPTCHA son requeridos" });
  }

  try {
    // Validar el token de reCAPTCHA con Google
    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken
      }
    });

    const { success, score } = recaptchaResponse.data;

    if (!success || score < 0.5) { // Puedes ajustar el score mínimo
      return res.status(400).json({ success: false, message: "Error en la verificación de reCAPTCHA" });
    }

    // Verificar las credenciales de usuario
    const result = await client.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    if (user.password === password) {  // Considera usar bcrypt para mayor seguridad
      res.json({
        success: true,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
        }
      });
    } else {
      res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

// Endpoint para obtener productos
app.get('/productos', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error ejecutando la consulta");
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
