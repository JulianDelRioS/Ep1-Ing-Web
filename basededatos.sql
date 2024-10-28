CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    rut VARCHAR(12) UNIQUE NOT NULL, -- RUT único para cada usuario
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    comuna VARCHAR(50),
    region VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE administradores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT REFERENCES usuarios(id) ON DELETE SET NULL,
    comuna_usuario VARCHAR(50),
    region_usuario VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'eliminado'))
);
CREATE TABLE solicitudes_productos (
    id SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE,
    id_administrador INT REFERENCES administradores(id) ON DELETE SET NULL,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_solicitud VARCHAR(20) DEFAULT 'pendiente' CHECK (estado_solicitud IN ('pendiente', 'aprobada', 'rechazada'))
);
