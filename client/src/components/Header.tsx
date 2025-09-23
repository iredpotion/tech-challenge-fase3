import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: "1rem", background: "#3b82f6", color: "#fff" }}>
      <nav>
        <Link to="/posts" style={{ marginRight: "1rem" }}>Posts</Link>
        {user?.cargo === "professor" && (
          <>
            <Link to="/create-post" style={{ marginRight: "1rem" }}>Novo Post</Link>
            <Link to="/admin" style={{ marginRight: "1rem" }}>Admin</Link>
          </>
        )}
        {!user ? (
          <>
            <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
            <Link to="/registrar">Registrar</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: "1rem" }}>Olá, {user.nome} ({user.cargo})</span>
            <button onClick={logout}>Sair</button>
          </>
        )}
      </nav>
    </header>
  );
}