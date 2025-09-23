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
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Editar Post</h2>
      <input value={titulo} onChange={e => setTitulo(e.target.value)} />
      <textarea value={descricao} onChange={e => setDescricao(e.target.value)} />
      <label>
        Ativo:
        <input type="checkbox" checked={postAtivo} onChange={e => setPostAtivo(e.target.checked)} />
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
}
