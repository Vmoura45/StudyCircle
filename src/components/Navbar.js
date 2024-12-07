import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/database'

export default function Navbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ margin: 0 }}>Study Platform</h1>
      <div>
        <Link href="/materials">
          <a
            style={{
              marginRight: '15px',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Materiais
          </a>
        </Link>
        <button
          onClick={handleSignOut}
          style={{
            padding: '8px 15px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
