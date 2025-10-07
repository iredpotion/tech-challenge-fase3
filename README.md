# 🧩 Tech Challenge Fase 3 — Full Stack (Posts, Comentários e Autenticação)

O projeto **tech-challenge-fase3** é uma aplicação **full-stack** composta por dois módulos principais:

- **Backend (`api/`)** — responsável pela lógica de negócios, autenticação, persistência e API REST.
- **Frontend (`client/`)** — interface desenvolvida em **React + Vite**, integrada ao backend via Axios.

A API gerencia **postagens e comentários em ambiente educacional**, com autenticação via **JWT** e documentação automática gerada com **Swagger (OpenAPI 3)**.

---

## ⚙️ Tecnologias Utilizadas

- **Node.js + Express** — backend e roteamento
- **MongoDB + Mongoose** — persistência de dados (container Docker)
- **JWT** — autenticação segura de usuários
- **Bcrypt** — criptografia de senhas
- **Docker & Docker Compose** — ambientes isolados
- **Swagger** — documentação interativa da API
- **Jest + Supertest** — testes automatizados das rotas
- **React + Vite + TypeScript** — frontend SPA
- **Axios + Context API + React Router DOM** — integração e navegação

---

## 🧱 Arquitetura do Sistema

A arquitetura segue o padrão **MVC (Model–View–Controller)** no backend e **SPA (Single Page Application)** no frontend.

```bash
tech-challenge-fase3/
├── api/              # Camada de backend (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── swagger.js
│   │   └── ...
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── server.js
└── client/           # Frontend (React + Vite + TypeScript)
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── routes/
    │   ├── services/
    │   ├── App.tsx
    │   └── main.tsx
    └── public/
```

---

## 🧠 Fluxo Principal

1. Usuário realiza login via `AuthController` e recebe **token JWT**.
2. Frontend envia requisições autenticadas para a API.
3. **PostController** gerencia o CRUD de **posts e comentários**.
4. Banco **MongoDB** armazena usuários, posts e comentários.

---

## 🌐 Endpoints da API

| Grupo | Método | Endpoint | Descrição |
|--------|---------|-----------|------------|
| **Autenticação** | POST | `/auth/registrar` | Registra novo usuário |
| **Autenticação** | POST | `/auth/login` | Login e geração de token JWT |
| **Posts** | GET | `/posts/busca` | Lista posts com filtro |
| **Posts** | GET | `/posts` | Lista posts ativos |
| **Posts** | GET | `/posts/professor` | Lista todos os posts (modo professor) |
| **Posts** | GET | `/posts/{id}` | Busca post por ID |
| **Posts** | POST | `/posts` | Cria novo post |
| **Posts** | PUT | `/posts/{id}` | Atualiza post existente |
| **Posts** | DELETE | `/posts/{id}` | Exclui post |
| **Comentários** | GET | `/posts/{id}/comentarios` | Lista comentários de um post |
| **Comentários** | POST | `/posts/{id}/comentarios` | Adiciona comentário |
| **Comentários** | PUT | `/posts/{postId}/comentarios/{comentarioId}` | Edita comentário existente |
| **Comentários** | DELETE | `/posts/{postId}/comentarios/{comentarioId}` | Exclui comentário |

---

## 🔐 Rotas de Autenticação

### 1. Registrar Novo Usuário
- **Rota:** `POST /auth/registrar`
- **Body:**
  ```json
  {
    "nome": "string",
    "email": "string",
    "senha": "string",
    "cargo": "string"
  }
  ```
- **Respostas:**
  - `201`: Usuário criado
  - `400`: Campos obrigatórios ausentes ou e-mail já cadastrado
  - `500`: Erro interno

### 2. Login de Usuário
- **Rota:** `POST /auth/login`
- **Body:**
  ```json
  {
    "email": "string",
    "senha": "string"
  }
  ```
- **Respostas:**
  - `200`: Login realizado com sucesso e token JWT retornado
  - `401`: Credenciais inválidas
  - `500`: Erro interno

---

## 💬 Rotas de Comentários

### 1. Listar Comentários
`GET /posts/{id}/comentarios`

### 2. Adicionar Comentário
`POST /posts/{id}/comentarios`

### 3. Editar Comentário
`PUT /posts/{postId}/comentarios/{comentarioId}`

### 4. Excluir Comentário
`DELETE /posts/{postId}/comentarios/{comentarioId}`

> **Regras:**
> - Usuários podem editar e excluir apenas os próprios comentários.
> - Professores podem excluir qualquer comentário.

---

## 🧭 Como Executar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone <url_do_repositorio>
cd tech-challenge-fase3
```

### 2️⃣ Subir o backend (API + MongoDB)
```bash
cd api/
docker-compose up -d --build
```

### 3️⃣ Subir o frontend React + Vite
```bash
cd client/
npm install
npm run dev
```

- Acesse o frontend em: **http://localhost:5173**
- Acesse a API em: **http://localhost:3000**
- Acesse a documentação Swagger: **http://localhost:3000/api-docs**

---

## 🧪 Testes e Qualidade

- **Jest + Supertest:** testes unitários e de integração das rotas.
- **Cobertura mínima:** 20%
- **ESLint:** padronização de código

Rodar os testes:
```bash
npm test
```

Rodar com relatório de cobertura:
```bash
npx jest --coverage
```

---

## 🧹 Limpar o Banco de Dados

Para apagar todos os dados do MongoDB via Docker:
```bash
docker exec -it mongo_db mongosh --eval 'use posts; db.dropDatabase(); print("Banco apagado!");'
```

---

## 🧰 Recursos Úteis

- **Swagger UI:** Documentação interativa (`/api-docs`)
- **Axios:** Comunicação entre frontend e backend
- **Context API:** Armazenamento global do usuário logado
- **React Router DOM:** Navegação SPA

---

## 🧩 Stack Resumida

| Camada | Tecnologia |
|--------|-------------|
| Backend | Node.js + Express |
| Banco | MongoDB + Mongoose |
| Autenticação | JWT + Bcrypt |
| Frontend | React + Vite + TypeScript |
| Testes | Jest + Supertest |
| Infra | Docker + GitHub Actions |

---
 
🚀 **Tech Challenge — Fase 3 (Full Stack Development)**  
🗓️ **2025**
