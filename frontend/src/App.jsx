import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, Sun, Moon, Activity } from 'lucide-react';
import Home from './pages/Home/Home';
import Usuarios from './pages/Usuarios/Usuarios';
import Login from './pages/login/Login';
import RotaPrivada from './components/RotaPrivada';
import Header from './components/Header';
import { useAuth } from './contexts/AuthContext';

function Layout() {
  const [theme, setTheme] = useState('light');
  const { sair } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSair = (e) => {
    e.preventDefault();
    sair();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={24} color="var(--primary-color)" />
            WEB III
          </div>
        </div>
        <Link to="/" className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link to="/usuarios" className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} />
          Usuários
        </Link>
        <Link to="/configuracoes" className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={20} />
          Configurações
        </Link>
        <Link to="/login" onClick={handleSair} className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', marginBottom: '1rem' }}>
          <LogOut size={20} />
          Sair
        </Link>
      </aside>

      <div className="right-area">
        <nav className="top-navbar">
          <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Header /> {/* Adiciona o Header ensinado na aula[cite: 77, 79] */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </nav>

        <main className="page-content">
          <Outlet /> {/* Renderiza as páginas filhas (Home, Usuarios)[cite: 77] */}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Rota pública de login */}
      <Route path="/login" element={<Login />} />
      
      {/* Rotas protegidas pela RotaPrivada[cite: 78] */}
      <Route element={
        <RotaPrivada>
          <Layout />
        </RotaPrivada>
      }>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Route>

      {/* Rota coringa que redireciona URLs não encontradas[cite: 78] */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;