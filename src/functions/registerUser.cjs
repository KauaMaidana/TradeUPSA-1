// Importa o modelo de usuário para interagir com o banco de dados
const User = require('../models/User.cjs');

// Função responsável por registrar um novo usuário
const registerUser = async (req, res) => {
    // Desestrutura os valores do corpo da requisição (req.body) para capturar os dados do novo usuário
    const { nome, cpf, telefone, telefoneRecupercao, email, emailRecuperacao, dataNasc, password } = req.body;

    try {
        // Verifica se já existe um usuário registrado com o mesmo e-mail
        const userRegistered = await User.findOne({ email });
        if (userRegistered) {
            // Se o e-mail já estiver registrado, retorna um erro informando que o usuário já existe
            return res.status(400).json({ message: "Usuário já registrado." });
        }
    
        // Cria um novo objeto de usuário com os dados fornecidos na requisição
        const newUser = new User({
            nome,                
            cpf,                 
            telefone,            
            telefoneRecupercao,  
            email,               
            emailRecuperacao,    
            dataNasc,            
            password            
        });
    
        // Salva o novo usuário no banco de dados
        await newUser.save();

        // Retorna uma resposta com status 201 (Criado) e uma mensagem de sucesso
        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        // Caso ocorra algum erro durante o processo, ele é registrado no console
        console.error(error);
        
        // Retorna uma resposta com status 500 (Erro no servidor) e a mensagem de erro
        res.status(500).json({ message: "Erro ao registrar usuário.", error });
    }
};

// Exporta a função registerUser para que ela possa ser utilizada em outras partes da aplicação
module.exports = { registerUser };
