require('dotenv').config(); // Carrega o arquivo .env

const { Pool } = require('pg');

// Configuração do Pool de conexões
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: false, // Desativa o SSL
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Conexão bem-sucedida com o banco de dados!');
    const result = await client.query('SELECT NOW()');
    console.log('Resultado da query:', result.rows[0]);
    client.release();
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
  }
}

testConnection();

module.exports = { pool };
