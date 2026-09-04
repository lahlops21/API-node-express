const express = require("express"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findByUsername } = require("../data/login.data");


const router = express.Router();

// Rota que vai receber as credenciais do usuário e gerar o token JWT
// É um método POST, pois estamos enviando dados no body

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    // Verificando se o usuario preencheu o username e a senha
    if (!username || !password) {
        return res.status(400).json({ message: "Username e password são obrigatórios" });
    }

    // Variável que vai receber o usuario encontrado no banco de dados (ou array, nesse caso)
    const user = findByUsername(username);

    // Verificando se o usuário existe
    if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Verificando se a senha está correta
    const ok = bcrypt.compareSync(password, user.passwordHash);
    if (!ok) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Gerando o token JWT que vamos devolver para o usuário
    // Criando o payload do token pois ele vai conter as informações que queremos enviar para o usuário
    const payload = {
        sub: String(user.id), // sub é o subject, ou seja, o id do usuário
        username: user.username,
        role: user.role
    };

    // Montar o token - o primeiro parâmetro é o payload, o segundo é a chave secreta e o terceiro são as opções do token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Devolver o token para o usuário- 3 coisas que vamos devolver para o usuário: o tipo do token, o token, e o tempo de expiração do token
    return res.json({ 
        tokenType: "Bearer",
        accessToken: token,
        expiresIn: process.env.JWT_EXPIRES_IN 
    
    });

});

module.exports = router;