const express = require('express');
const usuarioRoutes = require('./usuarioRoutes.js');
const authRoutes = require('./authRoutes.js');
const cotacaoRoutes = require('./cotacaoRoutes.js');

const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/', authRoutes);
router.use('/cotacoes', cotacaoRoutes);

module.exports = router;