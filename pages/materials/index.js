import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

export default function MaterialsList() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      alert('Erro ao carregar materiais');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Materiais de Estudo</h1>
        <Link href="/materials/new">
          <button
            style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Novo Material
          </button>
        </Link>
      </header>

      {loading ? (
        <p>Carregando...</p>
      ) : materials.length === 0 ? (
        <p>Nenhum material encontrado.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {materials.map((material) => (
            <div
              key={material.id}
              onClick={() => router.push(`/materials/${material.id}`)}
              style={{
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <h3>{material.title}</h3>
              <p>{material.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span>{new Date(material.created_at).toLocaleDateString()}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/materials/edit/${material.id}`);
                  }}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
