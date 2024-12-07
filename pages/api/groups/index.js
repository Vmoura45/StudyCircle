import { supabase } from '../../../src/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .select('*');
      
      if (error) throw error;
      
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .insert([req.body])
        .single();
      
      if (error) throw error;
      
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Método não permitido
  return res.status(405).json({ error: 'Method not allowed' });
}
