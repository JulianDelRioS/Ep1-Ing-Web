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

module.exports = router;