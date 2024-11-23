const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Jdr2965646',
    database: 'marketlink'
});

client.connect()
    .then(() => console.log("Conectado a PostgreSQL"))
    .catch(err => console.error("Error de conexión", err));

module.exports = client;