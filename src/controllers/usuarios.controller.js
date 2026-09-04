

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


// PUT /usuarios/:id
const atualizarUsuario = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { nome, email, senha, dataNascimento, cpf } = req.body;

        // 1. Validar se o usuário existe (404)
        const usuarioExistente = UsuariosData.buscarPorId(id);
        if (!usuarioExistente) {
            const erro = new Error('Usuário não encontrado');
            erro.status = 404;
            return next(erro);
        }

        // 2. Validar se todos os campos foram fornecidos (400)
        if (!nome || !email || !senha || !dataNascimento || !cpf) {
            const erro = new Error('Todos os campos são obrigatórios');
            erro.status = 400;
            return next(erro);
        }

        // 3. Validar conflito de E-mail com OUTRO usuário (409)
        const usuarioComMesmoEmail = UsuariosData.buscarPorEmail(email);
        if (usuarioComMesmoEmail && usuarioComMesmoEmail.id !== id) {
            const erro = new Error('Já existe outro usuário com este e-mail');
            erro.status = 409;
            return next(erro);
        }

        // 4. Validar conflito de CPF com OUTRO usuário (409)
        const usuarioComMesmoCpf = UsuariosData.buscarPorCpf(cpf);
        if (usuarioComMesmoCpf && usuarioComMesmoCpf.id !== id) {
            const erro = new Error('Já existe outro usuário com este CPF');
            erro.status = 409;
            return next(erro);
        }

        // 5. Atualizar na persistência
        const usuarioAtualizado = UsuariosData.atualizar(id, {
            nome,
            email,
            senha,
            dataNascimento,
            cpf
        });

        // 6. Retorna o usuário sem a senha (200)
        return res.status(200).json(removerSenha(usuarioAtualizado));

    } catch (error) {
        next(error); // Trata o erro 'error' 
    }

   
    
};

// DELETE /usuarios/:id
const excluirUsuario = (req, res, next) => {
    try {
        const id = Number(req.params.id);

        // 1. Verifica se o usuário existe (404)
        const usuarioExistente = UsuariosData.buscarPorId(id);
        if (!usuarioExistente) {
            const erro = new Error('Usuário não encontrado');
            erro.status = 404;
            return next(erro);
        }

        // 2. Executa a exclusão 
        UsuariosData.excluir(id);

        // 3. Retorna resposta de sucesso 200
        return res.status(200).json({ message: 'Usuário excluído com sucesso' });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
};
