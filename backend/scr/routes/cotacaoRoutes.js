const express = require('express');
const cotacaoController = require('../controllers/cotacaoController');
const { autenticar } = require('../middlewares/authMiddleware');
const router = express.Router();

// Rotas protegidas
router.get('/', autenticar, cotacaoController.listarCotacoes);
router.post('/:moeda', autenticar, cotacaoController.buscarNovaCotacao);
router.delete('/:id', autenticar, cotacaoController.excluirCotacao);

module.exports = router;