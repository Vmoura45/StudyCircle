import { useEffect } from 'react';
import { useGroup } from '../../src/contexts/groupContext';
import StudyGroupCard from '../../src/components/StudyGroup/StudyGroupCard';
import { useAuth } from '../../src/hooks/useAuth';

export default function Groups() {
  const { groups, loading } = useGroup();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Grupos de Estudo</h1>
      {groups.length === 0 ? (
        <p className="text-gray-700">Nenhum grupo encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <StudyGroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}
