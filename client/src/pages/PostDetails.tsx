import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext"; // Importa o hook de autenticação

interface Post {
  _id: string;
  titulo: string;
  descricao: string;
  autor: string;
  dataCriacao: string;
}

interface Comentario {
  usuario: string;
  texto: string;
  data: string;
}

export default function PostDetalhe() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const { user } = useAuth(); // Acessa o usuário logado

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => setPost(res.data));
    api.get(`/posts/${id}/comentarios`).then(res => setComentarios(res.data)); // precisa existir no backend
  }, [id]);

  const adicionarComentario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pega o nome do usuário do contexto de autenticação.
    // O operador '?' garante que a aplicação não quebre se o usuário não estiver logado.
    const usuario = user?.nome || "Anônimo"; 
    
    // Se o usuário não estiver logado, não permita o comentário
    if (!user) {
        alert("Você precisa estar logado para comentar.");
        return;
    }
    
    const comentario = { usuario, texto: novoComentario };
    await api.post(`/posts/${id}/comentarios`, comentario);
    setComentarios([...comentarios, { ...comentario, data: new Date().toISOString() }]);
    setNovoComentario("");
  };

  if (!post) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{post.titulo}</h2>
      <p>{post.descricao}</p>
      <p><strong>Autor:</strong> {post.autor}</p>
      <hr />
      <h3>Comentários</h3>
      {comentarios.map((c, i) => (
        <p key={i}><strong>{c.usuario}</strong>: {c.texto}</p>
      ))}
      {/* Se o usuário estiver logado, exibe o formulário de comentário */}
      {user ? (
        <form onSubmit={adicionarComentario}>
          <textarea
            placeholder="Escreva um comentário..."
            value={novoComentario}
            onChange={e => setNovoComentario(e.target.value)}
          />
          <button type="submit">Comentar</button>
        </form>
      ) : (
        // Se não estiver logado, exibe uma mensagem
        <p>Você precisa estar logado para comentar.</p>
      )}
    </div>
  );
}