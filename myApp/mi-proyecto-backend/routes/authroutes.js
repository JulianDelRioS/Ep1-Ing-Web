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

  if (isNaN(Date.parse(fechaNacimiento))) {
    return res.status(400).json({ error: "La fecha de nacimiento tiene un formato inválido" });
  }

  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserción en la base de datos
// Inserción en la base de datos
    const query = `
    INSERT INTO usuarios (nombre, email,password, rut, fechanacimiento, region, comuna)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id,nombre, email, rut, fechaNacimiento, region, comuna;
    ` ;

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
    console.log('Datos del usuario:', user);

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Respuesta en caso de éxito
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rut: user.rut,
        fechanacimiento: user.fechanacimiento,
        region: user.region,
        comuna: user.comuna,
        rol: user.rol, // Agregar el rol aquí
        fecha_registro: user.fecha_registro,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// Nuevo Endpoint para "Publicar producto" (POST /products)
router.post('/products', async (req, res) => {
  const {
    nombre_producto,
    precio,
    descripcion,
    email,
    region,
    comuna,
    categoria,
    subcategoria,
    rut_usuario,
    imagen1,
    imagen2,
    imagen3
  } = req.body;

  // Validación de datos
  if (!nombre_producto || !precio || !region || !comuna || !categoria || !rut_usuario || !imagen1) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben completarse." });
  }

  if (precio <= 0) {
    return res.status(400).json({ error: "El precio debe ser mayor a cero." });
  }

  try {
    const query = `
      INSERT INTO productos (
        nombre_producto, precio, descripcion, email, region, comuna, categoria, subcategoria, rut_usuario, imagen1, imagen2, imagen3
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, nombre_producto, precio, region, comuna, categoria, subcategoria;
    `;

    const values = [
      nombre_producto, precio, descripcion, email, region, comuna, categoria, subcategoria, rut_usuario, imagen1, imagen2, imagen3
    ];

    const result = await client.query(query, values);

    res.status(201).json({
      message: "Producto publicado exitosamente.",
      product: result.rows[0]
    });
  } catch (err) {
    console.error("Error al publicar el producto:", err);
    res.status(500).json({ error: "Error al publicar el producto." });
  }
});

// Endpoint para obtener todos los productos
router.get('/products', async (req, res) => {
  try {
    const query = ` 
      SELECT 
        id, nombre_producto, precio, descripcion, email, region, comuna, 
        categoria, subcategoria, imagen1, imagen2, imagen3 
      FROM productos
    `;
    const result = await client.query(query);

    res.status(200).json(result.rows); // Devuelve todos los productos
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});
// Endpoint para modificar la comuna y la región de un usuario (PUT /update-location)
router.put('/ProfilePage', async (req, res) => {
  const { email, region, comuna } = req.body;

  if (!email || !region || !comuna) {
    return res.status(400).json({ error: "El email, la región y la comuna son obligatorios" });
  }

  try {
    // Consulta para actualizar la región y comuna del usuario
    const query = `
      UPDATE usuarios
      SET region = $1, comuna = $2
      WHERE email = $3
      RETURNING id, nombre, email, region, comuna;
    `;
    const values = [region, comuna, email];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Región y comuna actualizadas exitosamente.",
      user: result.rows[0]
    });
  } catch (err) {
    console.error('Error al actualizar la región y comuna:', err);
    res.status(500).json({ error: "Error al actualizar la región y comuna" });
  }
});


module.exports = router;


