const cotacaoService = require('../services/cotacaoService');

const buscarNovaCotacao = async (req, res) => {
    try {
        const { moeda } = req.params; 
        
        if (!moeda) {
            return res.status(400).json({ error: 'É necessário informar a moeda' });
        }

        const novaCotacao = await cotacaoService.buscarESalvarCotacao(moeda);
        res.status(201).json(novaCotacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar e salvar cotação na API' });
    }
};

const listarCotacoes = async (req, res) => {
    try {
        const cotacoes = await cotacaoService.listarCotacoesSalvas();
        res.status(200).json(cotacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar cotações' });
    }
};

const excluirCotacao = async (req, res) => {
    try {
        const deletado = await cotacaoService.excluirCotacao(req.params.id);
        if (!deletado) return res.status(404).json({ error: 'Cotação não encontrada' });
        res.status(200).json({ mensagem: 'Cotação excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir cotação' });
    }
};

module.exports = {
    buscarNovaCotacao,
    listarCotacoes,
    excluirCotacao
};