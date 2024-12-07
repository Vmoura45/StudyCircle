import pool from '../../src/lib/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT NOW()');
      client.release();

      res.status(200).json({ success: true, timestamp: result.rows[0].now });
    } catch (error) {
      console.error('Erro ao conectar ao banco:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Método não permitido' });
  }
}
