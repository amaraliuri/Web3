import { useState, useEffect } from 'react';
import { getUsuarios, getUsuario, updateUsuario, deleteUsuario, createUsuario } from '../../services/usuarioServices';

function Usuarios() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idBusca, setIdBusca] = useState('');
    const [form, setForm] = useState({ nome: '', email: '', senha: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                console.log('Dados recebidos do backend:', data);
                setUsers(data);
            } catch (error) {
                setError(
                    error.response?.data?.error ||
                    error.message ||
                    'Erro ao buscar usuários'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

        const handleDelete = async (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este usuário?');
        if (!confirmar) {
            return;
        }
        try {
            await deleteUsuario(id);

            setUsers((usuarios) =>
            usuarios.filter((usuario) => usuario.id !== id)
            );

            alert('Usuário excluído com sucesso!');
        }catch (error) {
        alert('Erro ao excluir usuário');
        }
        };

        const handleEdit = async (user) => {
        const novoNome = window.prompt( 'Digite o novo nome:', user.nome );

        if (!novoNome) {
            return;
        }

        try {
            const usuarioAtualizado = await updateUsuario(
                user.id, {
                nome: novoNome,
                email: user.email,
                senha: user.senha,
                foto: user.foto
                }
            );

                setUsers((usuarios) =>
                    usuarios.map((usuario) =>
                    usuario.id === user.id
                    ? usuarioAtualizado
                    : usuario
            )
        );

            alert('Usuário atualizado com sucesso!');
            }catch (error) {
                alert('Erro ao atualizar usuário');
        }
        };
        const handleBuscarPorId = async () => {
            if (!idBusca) {
                return;
            }
            try {
                const usuario = await getUsuario(idBusca);
                setUsers([usuario]);
            }catch (error) {
                setError( error.response?.data?.error || 'Usuário não encontrado' );
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
        };

        const handleSalvar = async (e) => {
            e.preventDefault();
            try {
                await createUsuario(form);
                setForm({ nome: '', email: '', senha: '' });
                setIsModalOpen(false);
                alert('Usuário criado com sucesso!');
                window.location.reload();
            } catch (error) {
                alert('Erro ao criar usuário');
            }
        };

    return (
        <div className="page-container">
            <h1>Lista de Usuários</h1>

            <button
                style={{ ...styles.editButton, marginBottom: '20px', background: '#28a745' }}
                onClick={() => setIsModalOpen(true)}
            >
                + Cadastrar Novo Usuário
            </button>

            {isModalOpen && (
                <div style={{ padding: '20px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', marginBottom: '20px', borderRadius: '12px' }}>
                    <h2>Cadastrar Usuário</h2>
                    <form onSubmit={handleSalvar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                        <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit" style={styles.editButton}>Salvar</button>
                            <button type="button" style={styles.deleteButton} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={styles.searchContainer}>
                <input
                    type="number"
                    placeholder="Digite o ID do usuário"
                    value={idBusca}
                    onChange={(e) => setIdBusca(e.target.value)}
                />

                <button onClick={handleBuscarPorId}>
                    Buscar
                </button>

                <button
                    onClick={() => {
                        setIdBusca('');
                        window.location.reload();
                    }}
                >
                    Mostrar todos
                </button>
            </div>

            {loading && (
                <div style={styles.message}>
                    Carregando usuários...
                </div>
            )}

            {error && (
                <div style={styles.message}>
                    Ops! {error}
                </div>
            )}

            {!loading && !error && users.length === 0 && (
                <div style={styles.message}>
                    Nenhum usuário encontrado
                </div>
            )}

            {!loading && !error && users.length > 0 && (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} style={styles.userCard}>
                            <div style={styles.userInfo}>
                                <span style={styles.userName}>
                                    {user.nome}
                                </span>

                                <span style={styles.userEmail}>
                                    {user.email}
                                </span>
                            </div>

                            <div style={styles.actions}>
                                <span style={styles.statusBadge}>
                                    ID #{user.id}
                                </span>

                                <button style={styles.editButton} onClick={() => handleEdit(user)} >
                                    Editar
                                </button>

                                <button style={styles.deleteButton} onClick={() => handleDelete(user.id)} >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const styles = {
    searchContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        alignItems: 'center',
    },

    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },

    editButton: {
        background: 'var(--primary-color)',
        color: '#fff',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
    },

    deleteButton: {
        background: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
    },

    usersList: {
        listStyleType: 'none',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
    },

    userCard: {
        background:'var(--card-bg)',
        border: '1px solid var(--border-color)',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease',
    },

    userInfo: {
        display: 'flex',
        flexDirection: 'column',
    },

    userName: {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: '4px',
    },

    userEmail: {
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
    },

    statusBadge: {
        background: 'var(--badge-bg)',
        color: 'var(--primary-color)',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600',
    },
    message: {
        fontSize: '1.2rem',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        margin: '2rem 0',
    },
};

export default Usuarios;