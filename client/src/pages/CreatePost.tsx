import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

export default function NovoPost() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the user object from the context

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    // Get the author's name directly from the user object.
    // If the user is null, set a default value "Desconhecido".
    const autor = user?.nome || "Desconhecido"; 

    // Your API call remains the same, but now with the automatically determined author
    await api.post("/posts", {
      titulo,
      descricao,
      autor,
      postAtivo: true
    });

    alert("Post criado!");
    navigate("/posts");
  };

  return (
    <form onSubmit={handleCreatePost}>
      <h2>Novo Post</h2>
      <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
      <button type="submit">Criar</button>
    </form>
  );
}