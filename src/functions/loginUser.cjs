// Importa o modelo de usuário para interagir com o banco de dados
const User = require('../models/User.cjs');

// Função responsável por realizar o login do usuário
const loginUser = async (req, res) => {
    // Desestrutura os valores de email e senha do corpo da requisição (req.body)
    const { email, password } = req.body;

    try {
        // Tenta encontrar um usuário no banco de dados com o email fornecido
        const user = await User.findOne({ email });

        // Caso não encontre o usuário, retorna uma mensagem de erro
        if (!user) {
            return res.status(400).json({ message: "E-mail ou senha incorretos." });
        }

        // Compara a senha fornecida com a senha armazenada no banco de dados
        if (password !== user.password) {
            // Se as senhas não coincidirem, retorna uma mensagem de erro
            return res.status(400).json({ message: "E-mail ou senha incorretos." });
        }

        // Caso o login seja bem-sucedido, retorna um status 200 com as informações do usuário
        return res.status(200).json({
            message: "Login bem-sucedido!",
            user: {
                name: user.nome,  // Nome do usuário
                email: user.email, // Email do usuário
                dataNasc: user.dataNasc, // Data de nascimento do usuário
                cpf: user.cpf // CPF do usuário
            }
        });
    } catch (error) {
        // Caso ocorra algum erro durante o processo, ele é registrado e retornado como erro no servidor
        console.error("Erro ao realizar o login:", error);
        return res.status(500).json({ message: "Erro no servidor.", error });
    }
};

// Exporta a função loginUser para que possa ser utilizada em outras partes da aplicação
module.exports = { loginUser };
