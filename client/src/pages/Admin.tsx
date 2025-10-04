import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

interface Post {
  _id: string;
  titulo: string;
  descricao: string;
  autor: string;
  postAtivo: boolean;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {    
    api.get("/posts/professor").then(res => setPosts(res.data));
  }, []);

  const excluirPost = async (id: string) => {
    if (window.confirm("Deseja excluir este post?")) {
      try {
        await api.delete(`/posts/${id}`);        
        setPosts(posts.filter(p => p._id !== id));  
        alert("Post excluído com sucesso!");         
      } catch (error) {
        alert("Erro ao excluir o post.");
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Administração de Posts</h2>

      {posts.map(post => (
        <div key={post._id} className="admin-post-card">
          
          <h3>
            {post.titulo} 
            {/* APLICAÇÃO DE CLASSE CONDICIONAL AQUI */}
            <span className={post.postAtivo ? "status-ativo" : "status-inativo"}>
              ({post.postAtivo ? "Ativo" : "Inativo"})
            </span>
          </h3>

          <p>{post.descricao}</p>
          <p>Autor: {post.autor}</p>
          
          <div className="admin-actions">
            <Link to={`/editar-post/${post._id}`}>Editar</Link>
            <button onClick={() => excluirPost(post._id)}>Excluir</button>
          </div>
        </div>
      ))}

      {posts.length === 0 && <p>Nenhum post encontrado.</p>}
    </div>
  );
}