# atvv-atlantis

## Pré-requisitos

- **Node.js**: versão 18.x ou superior
- **npm**: versão 9.x ou superior
- **MongoDB Atlas**: conta gratuita (ou MongoDB local)

### Configurar Backend

```bash
cd backend
npm install
```

### Configurar Variáveis de Ambiente

Copie o arquivo `.envExemplo` e renomeie para `.env`:

```bash
cp .envExemplo .env
```

Edite o arquivo `.env` e adicione suas credenciais do MongoDB:

```env
PORT=5000
MONGODB_URI=sua_url_do_mongodb_atlas_aqui
```

**Como obter a URL do MongoDB Atlas:**

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita (se não tiver)
3. Crie um novo cluster (Free Tier M0)
4. Clique em "Connect" → "Connect your application"
5. Copie a URL de conexão (formato: `mongodb+srv://usuario:senha@cluster.mongodb.net/nomedobanco`)

### Configurar Frontend

```bash
cd ../frontend
npm install
```

## Executando o Projeto

### Executar Backend e Frontend Separadamente

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
O backend estará rodando em: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
O frontend estará rodando em: `http://localhost:5173`

## Dependências Principais

### Backend
- Express 4.18.2
- Mongoose 8.0.0
- CORS 2.8.5
- dotenv 16.3.1

### Frontend
- React 18.3.1
- React Router DOM 6.26.0
- Axios 1.6.0
- Tailwind CSS 3.4.17
- TypeScript 5.6.2
