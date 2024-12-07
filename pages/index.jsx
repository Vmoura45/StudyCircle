// pages/index.jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// Modo correto de importar
//import { supabase } from '@/lib/database';
import { useAuth } from '@/hooks/useAuth';


export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  
  console.log({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });
  
  return (
    

      
<h1>isso e um teste</h1>
    

  );

  

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard');
      }
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [router]);

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>Bem-vindo ao Sistema</h1>
      <p>Faça login ou registre-se para começar.</p>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => router.push('/login')}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <button
          onClick={() => router.push('/register')}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Registro
        </button>

        console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      </div>
    </div>
  );
}
