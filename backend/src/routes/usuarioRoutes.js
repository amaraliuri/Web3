const express = require('express');
const router = express.Router();                                                                                                                                                                                                                                                                  
const usuarioisController = require('../controllers/usuarioController');

router.get('/', usuarioisController.buscarUsuarios);

module.exports = router;