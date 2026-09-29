const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
const {autenticar, autorizar} = require('../middlewares/authMiddleware');

// rotas publicas
router.post('/',  usuarioController.criarUsuario);

// rotas para usuario
router.get('/', autenticar, usuarioController.buscarUsuario);
router.get('/:id', autenticar, usuarioController.buscarUsuarioPorId);
router.put('/:id', autenticar, usuarioController.editarUsuario);

// rotas adm
router.delete('/:id', autenticar, autorizar('adm'), usuarioController.excluirUsuario);


module.exports = router;