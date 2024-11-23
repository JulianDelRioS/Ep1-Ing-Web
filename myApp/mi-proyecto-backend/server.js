const express = require('express');
const authRoutes = require('./routes/authroutes'); // Importamos las rutas
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors()); // Habilita CORS para permitir solicitudes desde el frontend

// Middleware para procesar JSON
app.use(express.json()); // Usa express.json() directamente

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
