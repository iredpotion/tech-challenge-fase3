import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

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

// Função utilitária para formatar a data (mantendo o código limpo)
const formatDate = (dateString: string) => {
  if (!dateString) return "Data Desconhecida";
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',    
  });
};

export default function PostDetalhe() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    // Carrega o post
    api.get(`/posts/${id}`).then(res => setPost(res.data));
    
    // Carrega os comentários (catch corrigido para evitar erro de variável não utilizada)
    api.get(`/posts/${id}/comentarios`).then(res => setComentarios(res.data)).catch(() => console.log("Não foi possível carregar comentários."));
  }, [id]);

  const adicionarComentario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verifica se o usuário está logado e se o campo não está vazio
    if (!user || !user.nome || !novoComentario.trim()) {
        alert("Você precisa estar logado e digitar um comentário válido.");
        return;
    }
    
    const usuario = user.nome; 
    
    try {
        const comentarioPayload = { usuario, texto: novoComentario };
        // Envia o comentário. Supondo que a API retorne o objeto completo, incluindo a data.
        const res = await api.post(`/posts/${id}/comentarios`, comentarioPayload); 
        
        // Adiciona o novo comentário ao estado
        setComentarios([...comentarios, res.data || {...comentarioPayload, data: new Date().toISOString()}]);
        setNovoComentario("");
        
    } catch {
        // Catch limpo, sem declarar a variável de erro
        alert("Erro ao enviar comentário.");
    }
  };

  if (!post) return <div className="container">Carregando...</div>;

  return (
    // Centraliza o conteúdo da página
    <div className="container">
      
      {/* SEÇÃO PRINCIPAL DO POST */}
      <div className="post-detail-content">
        <h2>{post.titulo}</h2>
        
        {/* Exibe o autor e a data formatada */}
        <p className="post-meta">
          Por {post.autor} em {formatDate(post.dataCriacao)}
        </p>
        
        <p>{post.descricao}</p>
      </div>

      {/* SEÇÃO DE COMENTÁRIOS */}
      <div className="comments-section">
        <h3>Comentários ({comentarios.length})</h3>
        
        {/* Lista de Comentários Existentes */}
        <div className="comments-list">
            {comentarios.length > 0 ? (
                comentarios.map((c, i) => (
                    <div key={i} className="comment-item">
                        <strong>{c.usuario}</strong>
                        <p>{c.texto}</p>
                        <small>Publicado em: {formatDate(c.data)}</small>
                    </div>
                ))
            ) : (
                <p>Seja o primeiro a comentar!</p>
            )}
        </div>
        
        {/* Formulário de Novo Comentário */}
        {user ? (
          <form onSubmit={adicionarComentario} className="comment-form">
            <h4>Deixe seu comentário como {user.nome}</h4>
            <textarea
              placeholder="Escreva seu comentário aqui..."
              value={novoComentario}
              onChange={e => setNovoComentario(e.target.value)}
              required
            />
            <button type="submit">Comentar</button>
          </form>
        ) : (
          // Mensagem para usuários deslogados
          <div className="comment-form">
            <p>Você precisa estar logado para comentar.</p>
          </div>
        )}
      </div>
    </div>
  );
}