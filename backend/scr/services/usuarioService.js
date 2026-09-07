const Usuario = require('../models/Usuario');

const obterTodosUsuario = async () => {
    return await Usuario.findAll();
};

module.exports = { obterTodosUsuario };