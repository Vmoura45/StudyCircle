// pages/api/test-connection.js
import { Pool } from 'pg'

const pool = new Pool({
  host: 'aws-0-us-west-1.pooler.supabase.com',
  database: 'postgres',
  port: 6543,
  user: 'postgres.rlryuwookqvmycntfqvf',
  password: 'M3t0d012320@',
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    
    res.status(200).json({ 
      success: true, 
      timestamp: result.rows[0].now,
      message: '✅ Conexão bem sucedida!'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}