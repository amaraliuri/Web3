const Cotacao = require('../models/Cotacao');

const buscarESalvarCotacao = async (moeda) => {
    try {
        const url = `https://economia.awesomeapi.com.br/json/last/${moeda}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        const chave = moeda.replace('-', ''); 
        const cotacaoAPI = dados[chave];

        if (!cotacaoAPI) {
            throw new Error('Moeda não encontrada');
        }

        const novaCotacao = await Cotacao.create({
            codigo: cotacaoAPI.code,
            codigoIn: cotacaoAPI.codein,
            nome: cotacaoAPI.name,
            valorCompra: parseFloat(cotacaoAPI.bid),
            valorVenda: parseFloat(cotacaoAPI.ask),
            dataCotacao: new Date(cotacaoAPI.create_date),
        });

        return novaCotacao;
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        throw error;
    }
};

const listarCotacoesSalvas = async () => {
    return await Cotacao.findAll({
        order: [['createdAt', 'DESC']],
        limit: 50
    });
};

const excluirCotacao = async (id) => {
    const cotacao = await Cotacao.findByPk(id);
    if (!cotacao) return null;
    await cotacao.destroy();
    return true;
};

module.exports = {
    buscarESalvarCotacao,
    listarCotacoesSalvas,
    excluirCotacao
};