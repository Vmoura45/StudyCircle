import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { createStudyMaterial } from '../../lib/database';

export default function StudyMaterialForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = '';

      // Upload do arquivo
      if (file) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('study-materials')
          .upload(`${user.id}/${file.name}`, file);

        if (uploadError) throw uploadError;

        fileUrl = uploadData.path;
      }

      // Dados do material
      const materialData = {
        title,
        description,
        content,
        category,
        user_id: user.id,
        file_url: fileUrl,
      };

      await createStudyMaterial(materialData);

      // Resetar campos
      setTitle('');
      setDescription('');
      setContent('');
      setCategory('');
      setFile(null);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Erro ao criar material:', error);
      alert('Erro ao criar material de estudo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows="6"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoria</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          <option value="">Selecione uma categoria</option>
          <option value="matematica">Matemática</option>
          <option value="portugues">Português</option>
          <option value="historia">História</option>
          <option value="geografia">Geografia</option>
          <option value="ciencias">Ciências</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Arquivo (opcional)</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-1 block w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Salvando...' : 'Salvar Material'}
      </button>
    </form>
  );
}
