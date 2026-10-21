import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { usuario, sair } = useAuth();
    const navigate = useNavigate();

    const handleSair = () => {
        sair();
        navigate('/login');
    };

    if (!usuario) return null;

    return (
        <header style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontWeight: '500' }}>Olá, {usuario.nome}</span>
            {usuario.perfil === 'admin' && (
                <button onClick={() => navigate('/admin')} style={{ padding: '6px 12px', cursor: 'pointer' }}>
                    Painel
                </button>
            )}
            <button onClick={handleSair} style={{ padding: '6px 12px', cursor: 'pointer', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}>
                Sair
            </button>
        </header>
    );
}

export default Header;