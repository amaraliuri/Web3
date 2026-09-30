import { navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function RotaPrivada({ children, perfilNecessario  }) {
    const { usuario } = useAuth();

    if (!usuario) {
        return <navigate to="/login" replace/>;
    }

    if (perfilNecessario && usuario.perfil !== perfilNecessario) {
        return <navigate to="/sem-permissao" replace/>;
    }

    return children;
}

export default RotaPrivada;