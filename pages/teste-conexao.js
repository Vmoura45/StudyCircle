{/* pages/teste-conexao.js */}
import { useState, useEffect } from 'react';

export default function TesteConexao() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testarConexao = async () => {
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();

      if (data.success) {
        setStatus(`✅ Conexão bem sucedida! ${new Date(data.timestamp).toLocaleString()}`);
      } else {
        setStatus(`❌ Erro: ${data.error}`);
      }
    } catch (err) {
      console.error('Erro completo:', err);
      setStatus(`❌ Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testarConexao();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Teste de Conexão com o Banco de Dados</h1>
      <button
        onClick={testarConexao}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testando...' : 'Testar Conexão'}
      </button>
      {status && (
        <div className="mt-4 text-center">
          <p className="text-lg font-medium">{status}</p>
        </div>
      )}
    </div>
  );
}
