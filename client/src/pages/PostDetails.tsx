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
  _id: string;
  usuario: string;
  texto: string;
  data: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "Data desconhecida";
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function PostDetalhe() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [editando, setEditando] = useState<Record<string, string>>({});
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setPost(res.data));
    api
      .get(`/posts/${id}/comentarios`)
      .then((res) => setComentarios(res.data))
      .catch(() => console.log("Erro ao carregar comentários."));
  }, [id]);

  const adicionarComentario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.nome || !novoComentario.trim()) {
      alert("Você precisa estar logado e digitar um comentário válido.");
      return;
    }

    try {
      const res = await api.post(`/posts/${id}/comentarios`, {
        usuario: user.nome,
        texto: novoComentario,
      });
      setComentarios([...comentarios, res.data]);
      setNovoComentario("");
    } catch {
      alert("Erro ao enviar comentário.");
    }
  };

  const handleExcluirComentario = async (comentario: Comentario) => {
    if (!window.confirm("Deseja realmente excluir este comentário?")) return;

    try {
      await api.delete(`/posts/${id}/comentarios/${comentario._id}`, {
        data: { usuario: user?.nome, cargo: user?.cargo },
      });
      setComentarios((prev) => prev.filter((c) => c._id !== comentario._id));
    } catch {
      alert("Erro ao excluir comentário.");
    }
  };

  const salvarEdicao = async (comentario: Comentario) => {
    const novoTexto = editando[comentario._id];
    if (!novoTexto.trim()) return;

    try {
      const res = await api.put(`/posts/${id}/comentarios/${comentario._id}`, {
        usuario: user?.nome,
        cargo: user?.cargo,
        novoTexto,
      });
      setComentarios((prev) =>
        prev.map((c) => (c._id === comentario._id ? res.data.comentario : c))
      );
      setEditando((prev) => {
        const novo = { ...prev };
        delete novo[comentario._id];
        return novo;
      });
    } catch {
      alert("Erro ao editar comentário.");
    }
  };

  if (!post) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      <div className="post-detail-content">
        <h2>{post.titulo}</h2>
        <p className="post-meta">
          Por {post.autor} em {formatDate(post.dataCriacao)}
        </p>
        <p>{post.descricao}</p>
      </div>

      <div className="comments-section">
        <h3>Comentários ({comentarios.length})</h3>

        <div className="comments-list">
          {comentarios.length > 0 ? (
            comentarios.map((c) => {
              const estaEditando = editando[c._id] !== undefined;

              return (
                <div key={c._id} className="comment-item">
                  <strong>{c.usuario}</strong>

                  {estaEditando ? (
                    <>
                      <textarea
                        value={editando[c._id]}
                        onChange={(e) =>
                          setEditando((prev) => ({
                            ...prev,
                            [c._id]: e.target.value,
                          }))
                        }
                      />
                      <div className="comment-actions">
                        <button onClick={() => salvarEdicao(c)}>Salvar</button>
                        <button
                          onClick={() =>
                            setEditando((prev) => {
                              const novo = { ...prev };
                              delete novo[c._id];
                              return novo;
                            })
                          }
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{c.texto}</p>
                      <small>Publicado em: {formatDate(c.data)}</small>

                      {user && (
                        <div className="comment-actions">
                          {/* Autor pode editar e excluir */}
                          {user.nome === c.usuario && (
                            <>
                              <button
                                onClick={() =>
                                  setEditando((prev) => ({
                                    ...prev,
                                    [c._id]: c.texto,
                                  }))
                                }
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleExcluirComentario(c)}
                              >
                                Excluir
                              </button>
                            </>
                          )}
                          {/* Professor pode excluir qualquer comentário */}
                          {user.cargo === "professor" &&
                            user.nome !== c.usuario && (
                              <button
                                onClick={() => handleExcluirComentario(c)}
                              >
                                Excluir
                              </button>
                            )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <p>Seja o primeiro a comentar!</p>
          )}
        </div>

        {user ? (
          <form onSubmit={adicionarComentario} className="comment-form">
            <h4>Deixe seu comentário como {user.nome}</h4>
            <textarea
              placeholder="Escreva seu comentário aqui..."
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              required
            />
            <button type="submit">Comentar</button>
          </form>
        ) : (
          <div className="comment-form">
            <p>Você precisa estar logado para comentar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
