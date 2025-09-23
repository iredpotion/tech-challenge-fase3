import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, senha });

      const userData = {
        nome: res.data.nome,
        cargo: res.data.cargo,
        token: res.data.token,
      };

      login(userData);
      navigate("/posts");
    } catch {
      alert("Erro ao fazer login");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
      <button type="submit">Entrar</button>
      <p>
        Ainda não tem conta? <Link to="/registrar">Cadastre-se aqui</Link>
      </p>
    </form>
  );
}
