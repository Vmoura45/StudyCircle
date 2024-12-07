import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.NEXT_PUBLIC_DB_HOST,
  database: process.env.NEXT_PUBLIC_DB_NAME, // Banco correto (postgres)
  port: process.env.NEXT_PUBLIC_DB_PORT,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  ssl: false
});

export default pool;




// Outros métodos podem ser adicionados abaixo usando a sintaxe ESM


export async function createStudyMaterial(data) {
  try {
    const { data: material, error } = await supabase
      .from('study_materials')
      .insert([
        {
          title: data.title,
          description: data.description,
          content: data.content,
          category: data.category,
          user_id: data.user_id,
          file_url: data.file_url,
        },
      ])
      .select();
    if (error) throw error;
    return material[0];
  } catch (error) {
    console.error('Erro ao criar material:', error);
    throw error;
  }
}

export async function getStudyMaterials() {
  try {
    const { data: materials, error } = await supabase
      .from('study_materials')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return materials;
  } catch (error) {
    console.error('Erro ao buscar materiais:', error);
    throw error;
  }
}

export async function getStudyMaterialById(id) {
  try {
    const { data: material, error } = await supabase
      .from('study_materials')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return material;
  } catch (error) {
    console.error('Erro ao buscar material:', error);
    throw error;
  }
}

export async function updateStudyMaterial(id, data) {
  try {
    const { data: material, error } = await supabase
      .from('study_materials')
      .update({
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        file_url: data.file_url,
      })
      .eq('id', id)
      .select();
    if (error) throw error;
    return material[0];
  } catch (error) {
    console.error('Erro ao atualizar material:', error);
    throw error;
  }
}

export async function deleteStudyMaterial(id) {
  try {
    const { error } = await supabase
      .from('study_materials')
      .delete()
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Erro ao deletar material:', error);
    throw error;
  }
}

