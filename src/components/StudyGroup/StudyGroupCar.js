import React from 'react';
import { useGroup } from '../../contexts/groupContext';

export default function StudyGroupCard({ group }) {
  const { joinGroup } = useGroup();

  const handleJoin = async () => {
    try {
      await joinGroup(group.id);
      alert('Você entrou no grupo com sucesso!');
    } catch (error) {
      console.error('Erro ao entrar no grupo:', error);
      alert('Erro ao entrar no grupo');
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">{group.name}</h2>
      <p className="text-gray-700 mb-4">{group.description}</p>
      <p className="text-gray-500 mb-4">Membros: {group.members?.length || 0}</p>
      <button
        onClick={handleJoin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Participar
      </button>
    </div>
  );
}
