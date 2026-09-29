// Importação correta do Service no topo do arquivo
const usuarioService = require('../services/usuarioService');
const bcrypt = require('bcrypt');

const buscarUsuario = async (req, res) => {
    try {
        const usuarios = await usuarioService.obterTodosUsuario();
        // O frontend espera que a lista venha dentro da propriedade "Usuario"
        res.status(200).json({ Usuario: usuarios });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuarioService.obterUsuarioPorId(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        
        if (!nome || !email || !senha) {
            return res.status(400).json({ err: 'Dados inválidos' });
        }

        const hash = await bcrypt.hash(senha, 10);

        const novoUsuario = await usuarioService.criarUsuario({ nome, email, senha: hash });
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error("ERRO AO CRIAR USUARIO:", error);
        res.status(500).json({ err: 'Erro interno ao criar usuário' });
    }
};

const editarUsuario = async (req, res) => {
    try {
        const usuarioAtualizado = await usuarioService.atualizarUsuario(req.params.id, req.body);
        if (!usuarioAtualizado) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

const excluirUsuario = async (req, res) => {
    try {
        const usuarioExcluido = await usuarioService.excluirUsuario(req.params.id);
        if (!usuarioExcluido) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};

// Exportando os nomes EXATOS que o usuarioRoutes.js está tentando usar
module.exports = {
    buscarUsuario,
    buscarUsuarioPorId,
    criarUsuario,
    editarUsuario,
    excluirUsuario
};