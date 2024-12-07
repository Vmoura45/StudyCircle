import { useState } from 'react';
//import { supabase } from '@/lib/supabaseClient'

export default function StudyMaterialCard({ material, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar este material?')) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('study_materials')
        .delete()
        .match({ id: material.id });

      if (error) throw error;

      if (onDelete) onDelete();
    } catch (error) {
      setError('Erro ao deletar material');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
      <h3>{material.title}</h3>
      <p>{material.description}</p>
      <p>{material.content}</p>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deletando...' : 'Deletar'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
