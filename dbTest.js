const { pool } = require('./src/lib/database'); // Caminho correto para o módulo

(async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Conexão bem-sucedida!', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco:', err.message);
  } finally {
    process.exit();
  }
})();
