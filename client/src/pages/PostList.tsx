import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";


interface Post {
  _id: string;
  titulo: string;
  descricao: string;
  autor: string;
  postAtivo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api.get("/posts").then(res => {
      const ativos = res.data.filter((p: Post) => p.postAtivo === true);
      setPosts(ativos);
    });
  }, []);

  const filtrados = posts.filter(p =>
    p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    p.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="post-container">
      <h2>Lista de Posts</h2>
      <input placeholder="Buscar posts..." value={busca} onChange={e => setBusca(e.target.value)} />
      {filtrados.map(post => (
        <div className="post-card" key={post._id} >
          <div className="post-header">
            <span>{post.autor}</span>
            <span>{post.dataCriacao}</span>
          </div>
          <h3 className="post-title">{post.titulo}</h3>
          <div className="post-content-box">
            {post.descricao}
          </div>
          <div className="post-link">
          <Link to={`/posts/${post._id}`}>Ver mais...</Link>
          </div>
        </div>
      ))}
    </div>
  );
}