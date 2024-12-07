import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

const GroupContext = createContext({});

export function GroupProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('study_groups')
        .select('*');
      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error('Erro ao buscar grupos:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (groupData) => {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .insert([
          {
            ...groupData,
            creator_id: user.id,
          },
        ])
        .single();
      if (error) throw error;
      setGroups([...groups, data]);
      return data;
    } catch (error) {
      console.error('Erro ao criar grupo:', error.message);
      throw error;
    }
  };

  const joinGroup = async (groupId) => {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .insert([
          {
            group_id: groupId,
            user_id: user.id,
          },
        ]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao entrar no grupo:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchGroups();
    }
  }, [user]);

  return (
    <GroupContext.Provider
      value={{
        groups,
        loading,
        createGroup,
        joinGroup,
        fetchGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export const useGroup = () => {
  return useContext(GroupContext);
};
