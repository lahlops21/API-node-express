const express = require('express');
const usuariosController = require(
 '../controllers/usuarios.controller'
);


const router = express.Router();
router.get('/', usuariosController.listarUsuarios);
router.get('/:id', usuariosController.buscarUsuarioPorId);
router.post('/', usuariosController.criarUsuario);
router.put('/', atua)
module.exports = router;