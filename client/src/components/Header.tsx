import { useState } from "react"; 
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Removida importação de "./components.css" conforme boas práticas do React/Vite
import "../App.css";

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para fechar o menu após clicar em um link
  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <nav className="nav-content">

        {/* ÍCONE DE MENU HAMBÚRGUER (Visível apenas em mobile via CSS) */}
        <button className="menu-icon" onClick={toggleMenu} aria-expanded={isMenuOpen}>
          {/* O Ícone muda visualmente com a lógica CSS baseada no estado */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* O SVG deve ser mais compacto para representar o botão */}
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Bloco Esquerdo de Links: Fica em um STACK quando o menu está aberto */}
        <div
          className={`nav-left nav-links-group ${isMenuOpen ? 'menu-open' : ''}`}
          onClick={closeMenu} // Fecha o menu ao clicar em qualquer link
        >
          <Link to="/posts" className="nav-link">Posts</Link>

          {user?.cargo === "professor" && (
            <>
              <Link to="/create-post" className="nav-link">Novo Post</Link>
              <Link to="/admin" className="nav-link">Admin</Link>
            </>
          )}
        </div>

        {/* Bloco Direito (Login/Usuário) */}
        <div className="nav-right nav-links-group">
          {!user ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/registrar" className="nav-link">Registrar</Link>
            </>
          ) : (
            <>
              <span className="user-info">Olá, {user.nome} ({user.cargo})</span>
              <button className="logout-button" onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v18h-6M10 17l5-5-5-5M15 12H3" />
                </svg>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}