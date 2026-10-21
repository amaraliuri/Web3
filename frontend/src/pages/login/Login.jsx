import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const [ email, setEmail] = useState('');
    const [ senha, setSenha] = useState('');

    const { entrar, entrarComGoogle, carregando, erro } = useAuth();
    const navigate = useNavigate();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const deuCerto = await entrar(email, senha);
        if (deuCerto) {
            navigate('/usuarios');
        }
    };

    const handleGoogle = async (resposta) => {
        const deuCerto = await entrarComGoogle(resposta.credential);
        if (deuCerto) navigate('/usuarios');
    };
    
    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <h1>Entrar</h1>

                <input type="email" placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input type="password" placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                {erro && <p style={{ color: 'red' }}>{erro}</p>}

                <button type="submit" disabled={carregando}>
                    {carregando ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <div style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: '10px' }}>ou</p>
                <GoogleLogin
                    onSuccess={handleGoogle}
                    onError={() => console.log('Login com Google falhou')}
                />
            </div>
        </div>

        
    );
}

export default Login;