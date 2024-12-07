//import { supabase } from '@/lib/database'
import { authMiddleware } from '../../../middleware/auth'

export default async function handler(req, res) {
  const { id } = req.query
  
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      if (!data) {
        return res.status(404).json({ error: 'Material not found' })
      }
      
      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  
  if (req.method === 'PUT') {
    try {
      const user = await authMiddleware(req, res)
      const { data: existingMaterial } = await supabase
        .from('study_materials')
        .select('*')
        .eq('id', id)
        .single()
      
      if (!existingMaterial) {
        return res.status(404).json({ error: 'Material not found' })
      }
      
      if (existingMaterial.teacher_id !== user.id) {
        return res.status(403).json({ error: 'You can only update your own materials' })
      }
      
      const { data, error } = await supabase
        .from('study_materials')
        .update(req.body)
        .eq('id', id)
      
      if (error) throw error
      return res.status(200).json(data[0])
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  
  if (req.method === 'DELETE') {
    try {
      const user = await authMiddleware(req, res)
      const { data: existingMaterial } = await supabase
        .from('study_materials')
        .select('*')
        .eq('id', id)
        .single()
      
      if (!existingMaterial) {
        return res.status(404).json({ error: 'Material not found' })
      }
      
      if (existingMaterial.teacher_id !== user.id) {
        return res.status(403).json({ error: 'You can only delete your own materials' })
      }
      
      const { error } = await supabase
        .from('study_materials')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return res.status(200).json({ message: 'Material deleted successfully' })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' })
}