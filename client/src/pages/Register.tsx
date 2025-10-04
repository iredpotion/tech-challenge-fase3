import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("aluno");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/registrar", { nome, email, senha, cargo });
      alert("Usuário registrado com sucesso!");
      navigate("/login");
    } catch (err) {
      alert("Erro ao registrar");
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-form-card">
      <h2>Registrar</h2>
      <input 
        placeholder="Nome" 
        value={nome} 
        onChange={e => setNome(e.target.value)} 
        required
      />
      <input 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        type="email" 
        required
      />
      <input 
        placeholder="Senha" 
        type="password" 
        value={senha} 
        onChange={e => setSenha(e.target.value)} 
        required
      />
      <select 
        value={cargo} 
        onChange={e => setCargo(e.target.value)}
        required
      >
        <option value="aluno">Aluno</option>
        <option value="professor">Professor</option>
      </select>
      <button type="submit">Registrar</button>
    </form>
  );
}