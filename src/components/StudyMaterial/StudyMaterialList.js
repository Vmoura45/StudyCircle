import { useEffect, useState } from 'react';
//import { supabase } from '@/lib/supabaseClient'
import StudyMaterialCard from './StudyMaterialCard';

export default function StudyMaterialList() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMaterials(data);
    } catch (error) {
      setError('Erro ao carregar materiais de estudo');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {materials.map((material) => (
        <StudyMaterialCard key={material.id} material={material} />
      ))}
    </div>
  );
}
