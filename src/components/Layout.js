import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
//import { supabase } from '@/lib/database'

export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica o usuário atual
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    // Listener para mudanças na autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header>
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1>Study App</h1>
          </div>
          <div>
            {user ? (
              <>
                <button onClick={() => router.push('/dashboard')}>Dashboard</button>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => router.push('/login')}>Login</button>
                <button onClick={() => router.push('/register')}>Registrar</button>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
