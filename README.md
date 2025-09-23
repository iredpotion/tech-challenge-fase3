# API - Tech Challenge Fase 2

API RESTful para **gestão de postagens em ambiente educacional**, construída com **Node.js**, **Express** e **MongoDB** (containerizado via Docker). Possui documentação automática via **Swagger OpenAPI 3** e pipelines de CI/CD com **GitHub Actions**. Os testes garantem pelo menos **20% de cobertura de código** para cenários críticos (criar, editar, excluir posts).


## Tecnologias Utilizadas

- **Node.js** + **Express** — back-end e roteamento
- **MongoDB** — persistência de dados dentro de container Docker
- **Docker** — ambientes replicáveis e isolados
- **GitHub Actions** — Workflows de CI/CD para lint, testes e deploy
- **Swagger (OpenAPI 3)** — Documentação interativa da API
- **Jest** — Testes unitários com cobertura mínima de 20%



## Endpoints

### 1. **Listar Posts com Filtro**

- **Rota:** `GET /posts/busca`
- **Descrição:** Retorna posts filtrados por `titulo` e/ou `descricao` (case-insensitive).
- **Parâmetros de Query:**
    - `titulo` (opcional): Filtro pelo título.
    - `descricao` (opcional): Filtro pela descrição.
- **Respostas:**
    - `200 OK`: Lista de posts filtrados.
    - `500 Internal Server Error`: Erro ao buscar posts.



### 2. **Listar Posts Ativos**

- **Rota:** `GET /posts`
- **Descrição:** Retorna apenas os posts ativos (`postAtivo: true`).
- **Respostas:**
    - `200 OK`: Lista de posts ativos.
    - `500 Internal Server Error`: Erro ao listar posts.



### 3. **Listar Todos os Posts (Modo Professor)**

- **Rota:** `GET /posts/professor`
- **Descrição:** Retorna todos os posts, inclusive os inativos.
- **Respostas:**
    - `200 OK`: Lista completa de posts.
    - `500 Internal Server Error`: Erro ao buscar os posts.



### 4. **Buscar Post por ID**

- **Rota:** `GET /posts/{id}`
- **Descrição:** Retorna um post específico com base no ID.
- **Parâmetros de Rota:**
    - `id` (obrigatório): ID do post.
- **Respostas:**
    - `200 OK`: Post encontrado.
    - `404 Not Found`: ID não localizado.
    - `500 Internal Server Error`: Erro ao buscar o post.



### 5. **Criar Novo Post**

- **Rota:** `POST /posts`
- **Descrição:** Cria um novo post. Campos de data (`dataCriacao` e `dataAtualizacao`) **não são permitidos no corpo da requisição**.
- **Body JSON:**
    
    ```json
    {
      "titulo": "string",
      "descricao": "string",
      "autor": "string"
    }
    ```
    
- **Respostas:**
    - `201 Created`: Post criado com sucesso.
    - `500 Internal Server Error`: Erro ou tentativa de envio de campos de data.



### 6. **Atualizar Post por ID**

- **Rota:** `PUT /posts/{id}`
- **Descrição:** Atualiza campos de um post existente. Alterações em `dataCriacao` e `dataAtualizacao` **não são permitidas**.
- **Parâmetros de Rota:**
    - `id` (obrigatório): ID do post.
- **Body JSON:**
    
    ```json
    {
      "titulo": "string",
      "descricao": "string",
      "conteudo": "string"
    }
    ```
    
- **Respostas:**
    - `200 OK`: Post atualizado.
    - `500 Internal Server Error`: Erro ao atualizar ou tentativa de alterar datas.



### 7. **Excluir Post por ID**

- **Rota:** `DELETE /posts/{id}`
- **Descrição:** Remove um post do banco de dados.
- **Parâmetros de Rota:**
    - `id` (obrigatório): ID do post.
- **Respostas:**
    - `200 OK`: Post excluído com sucesso.
    - `500 Internal Server Error`: Erro ao excluir o post.



## Observações Técnicas

- As datas são sempre formatadas para o padrão `pt-BR` (dd/mm/aaaa) antes de retornar ao cliente.
- O sistema é protegido contra alterações ou criações com `dataCriacao` e `dataAtualizacao`, garantindo a integridade dessas informações.
- Filtros de busca utilizam expressões regulares (`$regex`) com case insensitive (`$options: "i"`).



## OpenAPI (Swagger)


<img width="862" height="643" alt="image" src="https://github.com/user-attachments/assets/b9495ecc-9ff5-4f5a-9b55-8d7825865429" />



## Docker & MongoDB

Arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:5.0
    container_name: mongo_db_projeto1
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  app:
    build: .
    container_name: node_app_projeto1
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - MONGO_URI=mongodb://mongo:27017/posts
    depends_on:
      - mongo
    env_file:
      - .env

volumes:
  mongo_data:
  
```

Para iniciar o ambiente:

```bash
docker-compose up -d
```



## Testes e Qualidade

- **Jest** com cobertura mínima de 20% focando nos controladores e lógica crítica.
- **ESLint** para padronização de código.
- Workflows do GitHub Actions para:
    - `lint`
    - `test`
    - `build`
    - **deploy** (de acordo com ambiente)



## Como Executar a Aplicação

### 1. Pré-requisitos:
Node.js: A aplicação depende do Node.js para funcionar, mas com Docker, você não precisa instalar o Node localmente.

Docker: Usado para containerizar a aplicação.

Docker Compose: Usado para orquestrar a aplicação e serviços relacionados.

### 2. Configuração e Inicialização:
- Clone o repositório:

```bash
git clone <url_do_repositorio>
cd <diretorio_do_repositorio>
```

- Subir a aplicação com Docker Compose:
Esse comando vai construir as imagens, instalar as dependências automaticamente e iniciar os containers.
bash
```
docker-compose up -d
```
- O -d roda os containers em segundo plano (modo "detached").
- Não é necessário rodar npm install, pois o Dockerfile já está configurado para instalar as dependências automaticamente durante a criação da imagem.

### 3. Acessando a Aplicação:
- A aplicação estará disponível no endereço configurado no docker-compose.yml (localhost:3000).
- Abra o navegador e acesse http://localhost:3000/api-docs, onde <porta> é a porta configurada na sua aplicação.

### 4. Execução dos Testes:
Caso queira rodar os testes dentro do container, você pode executar o seguinte comando:

bash
```
docker-compose exec <nome_do_servico> npm test
```

Onde:

<nome_do_servico> é o nome do serviço configurado no docker-compose.yml. Por exemplo, se o nome do serviço for app, o comando seria docker-compose exec app npm test.

### 5. Parar os Containers:
Se precisar parar os containers, use:

bash
```
docker-compose down
```

## Recursos Úteis

- **Dev.to**: *Documenting Node.js API using Swagger* — configuração manual com `swagger-jsdoc`, acesso ao `/docs` e `/docs.json` ([dev.to](https://dev.to/desmondsanctity/documenting-nodejs-api-using-swagger-4klp?utm_source=chatgpt.com))
- **Robin Raju**: uso do Swagger Editor para validações e refino manual da spec YAML ([robinraju.io](https://robinraju.io/documenting-rest-apis-using-swagger/?utm_source=chatgpt.com))

