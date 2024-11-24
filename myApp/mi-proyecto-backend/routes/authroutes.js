const express = require('express');
const bcrypt = require('bcrypt');
const client = require('../db'); // Importar la conexión desde db.js
const router = express.Router();

// Endpoint para "Crear cuenta" (POST /signup)
router.post('/signup', async (req, res) => {
  const { nombre, email, password, rut, fechaNacimiento, region, comuna } = req.body;

  if (!nombre || !email || !password || !rut || !fechaNacimiento || !region || !comuna) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  

  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserción en la base de datos
// Inserción en la base de datos
    const query = `
    INSERT INTO usuarios (nombre, email, password, rut, fechaNacimiento, region, comuna)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, nombre, email, fecha_registro;
    `;

    const values = [nombre, email, hashedPassword, rut, fechaNacimiento, region, comuna];
    const result = await client.query(query, values);

    // Respuesta en caso de éxito
    res.status(201).json({
      message: "Usuario creado exitosamente.",
      user: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    // Manejar errores (como restricciones UNIQUE)
    if (err.code === '23505') {
      res.status(409).json({ error: "El email o rut ya están registrados." });
    } else {
      res.status(500).json({ error: "Error al crear el usuario." });
    }
  }
});

// Endpoint para "Iniciar sesión" (POST /login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "El email y la contraseña son obligatorios" });
  }

  try {
    // Verificar si el usuario existe en la base de datos
    const query = `SELECT * FROM usuarios WHERE email = $1`;
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Respuesta en caso de éxito (podrías devolver un token JWT aquí, si lo necesitas)
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        fecha_registro: user.fecha_registro,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});
module.exports = router;