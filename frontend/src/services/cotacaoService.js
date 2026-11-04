import api from './api';

export const getCotacoes = async () => {
    const response = await api.get('/cotacoes');
    return response.data;
};

export const buscarESalvarNovaCotacao = async (moeda) => {
    const response = await api.post(`/cotacoes/${moeda}`);
    return response.data;
};