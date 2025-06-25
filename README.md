
---

## 📁 `backend/README.md`

# 📚 Bookshelf — Backend

API REST do projeto **Bookshelf**, desenvolvida com Node.js, Express e Sequelize ORM, conectada a um banco de dados MySQL. Responsável pela autenticação de usuários e persistência da estante de livros.

---

## 🚀 Objetivo

Oferecer uma camada de backend robusta e segura para suportar as funcionalidades da aplicação Bookshelf, incluindo autenticação e armazenamento de livros.

---

## 🛠️ Tecnologias Utilizadas

- Node.js (CommonJS)
- Express.js
- Sequelize ORM
- MySQL (via XAMPP)
- Axios (para buscar imagens de capa e gerar PDFs)
- PDFKit (geração de PDF com capa, título, autor, ano)

---

## 💻 Como Instalar o Backend

### Pré-requisitos

- Node.js instalado (versão recomendada: 18+)
- XAMPP com MySQL rodando na porta 3306
- Banco de dados `bookshelf_db` criado

### Instalação do node_modules

```bash
npm install
```

### Configuração do Banco
Crie um arquivo .env ou edite config/config.js com as variáveis:

```bash 
JWT_SECRET=secret123
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bookshelf
DB_DIALECT=mysql
```
### Criar banco e tabelas

```bash 
npx sequelize db:create
npx sequelize db:migrate
```

### Iniciar o servidor localmente

```bash
npm run dev
```
Servidor disponível em http://localhost:5000.
