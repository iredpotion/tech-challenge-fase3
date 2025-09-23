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
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    }
  };

  return (
    <div>
      <h2>Administração de Posts</h2>
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.titulo} ({post.postAtivo ? "Ativo" : "Concluído"})</h3>
          <p>{post.descricao}</p>
          <p>Autor: {post.autor}</p>
          <Link to={`/editar-post/${post._id}`}>Editar</Link>
          <button onClick={() => excluirPost(post._id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}