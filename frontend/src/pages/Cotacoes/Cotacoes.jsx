import { useState, useEffect } from 'react';
import { getCotacoes, buscarESalvarNovaCotacao, deleteCotacao } from '../../services/cotacaoService';

function Cotacoes() {
    const [cotacoes, setCotacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buscando, setBuscando] = useState(false);

    const carregarCotacoes = async () => {
        try {
            const data = await getCotacoes();
            setCotacoes(data);
        } catch (error) {
            console.error('Erro ao carregar cotações', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarCotacoes();
    }, []);

    const handleBuscarNova = async (moeda) => {
        setBuscando(true);
        try {
            await buscarESalvarNovaCotacao(moeda);
            await carregarCotacoes();
            alert(`Cotação de ${moeda} atualizada com sucesso!`);
        } catch (error) {
            alert(`Erro ao buscar cotação de ${moeda}`);
        } finally {
            setBuscando(false);
        }
    };

    const handleExcluir = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta cotação?')) return;
        try {
            await deleteCotacao(id);
            setCotacoes(cotacoes.filter(c => c.id !== id));
        } catch (error) {
            alert('Erro ao excluir cotação');
        }
    };

    return (
        <div className="page-container">
            <h1>Cotações de Moedas</h1>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                    style={styles.btnPrimary} 
                    onClick={() => handleBuscarNova('USD-BRL')}
                    disabled={buscando}
                >
                    {buscando ? 'Buscando...' : 'Cotar Dólar (USD)'}
                </button>
                <button 
                    style={styles.btnSecondary} 
                    onClick={() => handleBuscarNova('EUR-BRL')}
                    disabled={buscando}
                >
                    {buscando ? 'Buscando...' : 'Cotar Euro (EUR)'}
                </button>
                <button 
                    style={{...styles.btnSecondary, background: '#f59e0b'}} 
                    onClick={() => handleBuscarNova('BTC-BRL')}
                    disabled={buscando}
                >
                    {buscando ? 'Buscando...' : 'Cotar Bitcoin (BTC)'}
                </button>
            </div>

            {loading ? (
                <p>Carregando histórico...</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {cotacoes.length === 0 ? (
                        <p>Nenhuma cotação salva no banco ainda.</p>
                    ) : (
                        cotacoes.map((c) => (
                            <div key={c.id} style={styles.card}>
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0' }}>{c.nome}</h3>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        {new Date(c.dataCotacao).toLocaleString('pt-BR')}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
                                    <div>
                                        <p style={{ margin: '0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Compra</p>
                                        <strong style={{ color: '#10b981' }}>R$ {Number(c.valorCompra).toFixed(2)}</strong>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Venda</p>
                                        <strong style={{ color: '#ef4444' }}>R$ {Number(c.valorVenda).toFixed(2)}</strong>
                                    </div>
                                    <button onClick={() => handleExcluir(c.id)} 
                                        style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

const styles = {
    btnPrimary: {
        background: 'var(--primary-color)',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    btnSecondary: {
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    card: {
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        padding: '15px 20px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
};

export default Cotacoes;