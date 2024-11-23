const express = require('express');
const { Client } = require('pg');
const cors = require('cors');  // Agregar CORS

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

// Habilitar CORS para aceptar solicitudes desde otro puerto
app.use(cors());  // Esto permitirá que tu frontend pueda hacer solicitudes al backend

// Middleware para manejar JSON en el cuerpo de la solicitud
app.use(express.json());

// Endpoint para obtener productos
app.get('/productos', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error ejecutando la consulta");
  }
});

// Endpoint para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email y contraseña son requeridos" });
  }

  try {
    const result = await client.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    if (user.password === password) {  // Considera usar bcrypt para verificar contraseñas
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
    res.status(500).send("Error ejecutando la consulta");
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
