

const UsuariosData = require('../data/usuarios.data');

const removerSenha = (usuario) => ({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    dataNascimento: usuario.dataNascimento,
    cpf: usuario.cpf
});

// GET /usuarios

const listarUsuarios = (req, res, next) => {
    try {
        const usuarios = UsuariosData.listar();
        const resultado = usuarios.map(removerSenha);
    return res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};


//  GET /usuarios/:id

const buscarUsuarioPorId = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const usuario = UsuariosData.buscarPorId(id);
    if (!usuario) {
        const erro = new Error('Usuário não encontrado');
        erro.status = 404;
    return next(erro);
    }
    
    return res.status(200).json(removerSenha(usuario));

    } catch (error) {
    next(error);
    }
};


//POST /usuarios

const criarUsuario = (req, res, next) => {
 try {
    const {
        nome,
        email,
        senha,
        dataNascimento,
        cpf
           } = req.body;
        
        if (!nome || !email || !senha || !dataNascimento || !cpf) {
        const erro = new Error('Todos os campos são obrigatórios');
        erro.status = 400;
        return next(erro);
        }
        
        if (UsuariosData.buscarPorEmail(email)) {
            const erro = new Error(
            'Já existe um usuário com este e-mail'
            );
        
            erro.status = 409;
            return next(erro);
            }
        
        if (UsuariosData.buscarPorCpf(cpf)) {
            const erro = new Error(
            'Já existe um usuário com este CPF'
            );
            
            erro.status = 409;
            return next(erro);
            }
            
const novoUsuario = UsuariosData.inserir({
        nome,
        email,
        senha,
        dataNascimento,
        cpf
        
    });
 
        return res.status(201).json(removerSenha(novoUsuario));
        } catch (error) {
        next(error);
        }
};


// PUT 

const atualizarUsuario = (req, res, next) => {

    try {
        const id = Number(req.params.id);
        const usuario = UsuariosData.buscarPorId(id);
        const {
        nome,
        email,
        senha,
        dataNascimento,
        cpf
           } = req.body;

        const usuarioAtualizado = UsuariosData.inserir({
        nome,
        email,
        senha,
        dataNascimento,
        cpf
        
    });

    if (!usuario) {
        const erro = new Error('Usuário não encontrado');
        erro.status = 404;
    return next(erro);
    }
    return res.status(200).json(removerSenha(usuarioAtualizado));
    } catch (err) {
         next(error);
    }

}




module.exports = {
 listarUsuarios,
 buscarUsuarioPorId,
 criarUsuario
};
