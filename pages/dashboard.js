import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//import { supabase } from '@/lib/database'

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
    } else {
      setUser(session.user);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Dashboard</h1>
        <button
          onClick={handleSignOut}
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sair
        </button>
      </header>

      <main>
        <section style={{ marginBottom: '20px' }}>
          <h2>Materiais Recentes</h2>
          {/* Aqui você pode renderizar a lista de materiais recentes */}
          <p>Lista de materiais será exibida aqui.</p>
        </section>

        <section>
          <h2>Estatísticas</h2>
          {/* Aqui você pode renderizar estatísticas do usuário */}
          <p>Estatísticas do usuário serão exibidas aqui.</p>
        </section>
      </main>
    </div>
  );
}
