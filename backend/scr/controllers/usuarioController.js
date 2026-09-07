const usuarioService = require('../services/usuarioService');


const buscarUsuario = async (req, res) => {
    try {
        const Usuario = await usuarioService.obterTodosUsuario();
        res.status(200).json({Usuario});
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

module.exports = {
    buscarUsuario,
};
    