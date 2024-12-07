import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Importa supabase se for necessário
// import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();

  // Função para verificar conexão com o backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/db');
        const data = await response.json();

        if (data.success) {
          setStatus(`✅ Conexão bem-sucedida: ${new Date(data.timestamp).toLocaleString()}`);
        } else {
          setStatus(`❌ Erro: ${data.error}`);
        }
      } catch (err) {
        setStatus(`❌ Erro: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  // Função para realizar login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Adicione aqui o código de autenticação com supabase ou outro serviço
      /*
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      */

      // Após login bem-sucedido, redirecione para o dashboard
      router.push('/dashboard');
    } catch (error) {
      alert('Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>

      {status && (
        <p
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: status.startsWith('✅') ? 'green' : 'red',
          }}
        >
          {status}
        </p>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
