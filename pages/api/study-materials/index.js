//import { supabase } from '@/lib/database'
import { authMiddleware } from '../../../middleware/auth'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { subject } = req.query
      let query = supabase.from('study_materials').select('*')
      
      if (subject) {
        query = query.eq('subject', subject)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  
  if (req.method === 'POST') {
    try {
      const user = await authMiddleware(req, res)
      if (user.user_type !== 'teacher') {
        return res.status(403).json({ error: 'Only teachers can create study materials' })
      }
      
      const material = { ...req.body, teacher_id: user.id }
      const { data, error } = await supabase
        .from('study_materials')
        .insert(material)
      
      if (error) throw error
      return res.status(201).json(data[0])
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' })
}