import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditarPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [postAtivo, setPostAtivo] = useState(true);

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => {
      setTitulo(res.data.titulo);
      setDescricao(res.data.descricao);
      setPostAtivo(res.data.postAtivo);
    });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/posts/${id}`, { titulo, descricao, postAtivo });
    alert("Post atualizado!");
    navigate("/admin");
    console.log("Post atualizado:", { titulo, descricao, postAtivo });
  };

  return (
    // Reutiliza a classe 'container' para centralizar o conteúdo na tela
    <div className="container">
      <h2>Editar Post</h2>

      {/* Reutiliza a classe 'create-post-form' para estilizar como um cartão */}
      <form onSubmit={handleUpdate} className="create-post-form">
        <input
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Título"
          required
        />
        <textarea
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          placeholder="Descrição"
          required
        />

        <label>
          Ativo:
          <input
            type="checkbox"
            checked={postAtivo}
            onChange={e => setPostAtivo(e.target.checked)}
          />
        </label>

        <button type="submit">
          Salvar
        </button>
      </form>
    </div>
  );
}
