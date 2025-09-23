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

  const formatarData = (dataString: string) => {    
    if (!dataString || !dataString.includes('/')) {
      return null;
    }    
    const partes = dataString.split('/');    
    return `${partes[1]}/${partes[0]}/${partes[2]}`;
  };

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
    <div>
      <h2>Lista de Posts</h2>
      <input placeholder="Buscar posts..." value={busca} onChange={e => setBusca(e.target.value)} />
      {filtrados.map(post => (
        <div key={post._id} style={{ marginBottom: "1rem" }}>
          <span>{post.autor}</span>
          <h3>{post.titulo}</h3>
          <p>{post.descricao}</p>
          <span>{new Date(formatarData(post.dataAtualizacao)!).toLocaleDateString()}</span>
          <Link to={`/posts/${post._id}`}>Ver detalhes</Link>
        </div>
      ))}
    </div>
  );
}