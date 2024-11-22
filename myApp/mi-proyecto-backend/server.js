const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Configuración de conexión a PostgreSQL
const client = new Client({
  host: 'localhost', // Cambia si no es local
  port: 5432,
  user: 'postgres',
  password: 'Jdr2965646',
  database: 'marketlink'
});

// Conectar a PostgreSQL
client.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch(err => console.error("Error de conexión", err));

// Endpoint de prueba
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
