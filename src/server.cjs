// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa as dependências necessárias
const express = require('express');  // Framework para criação do servidor
const cors = require('cors');        // Middleware para permitir CORS (Cross-Origin Resource Sharing)
const mongoose = require('mongoose'); // Biblioteca para interagir com o MongoDB

// Criação da instância do servidor Express
const app = express();

// Middleware para parsear o corpo das requisições em formato JSON
app.use(express.json());

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Define a porta onde o servidor irá rodar, ou usa o valor da variável de ambiente PORT (caso configurado)
const PORT = process.env.PORT || 3000; // Caso a variável de ambiente PORT não esteja definida, usa a porta 3000

// Conecta ao banco de dados MongoDB usando a URI fornecida na variável de ambiente MONGODB_URI
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,        // Configuração do Mongoose para usar a nova forma de conectar com o MongoDB
    useUnifiedTopology: true,     // Habilita o uso do novo engine de topologia do MongoDB (mais eficiente)
})
.then(() => console.log('MongoDB conectado!')) // Exibe mensagem de sucesso ao conectar
.catch((error) => console.error('Erro ao conectar ao MongoDB:', error)); // Exibe erro caso a conexão falhe

// Importa as rotas do arquivo userRoutes.cjs, onde estão as rotas relacionadas aos usuários
const userRoutes = require('./userRoutes.cjs');

// Usa o middleware de rotas para todas as requisições que começam com '/api'
// Isso significa que todas as rotas definidas em 'userRoutes' estarão acessíveis a partir de '/api'
app.use('/api', userRoutes);

// Inicializa o servidor para escutar na porta definida
app.listen(PORT, () => {
    // Exibe mensagem indicando que o servidor está rodando e em qual porta
    console.log(`Servidor rodando na porta ${PORT}`);
});
