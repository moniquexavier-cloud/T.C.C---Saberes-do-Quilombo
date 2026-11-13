import { criarToken } from '../middleware/auth.js';

const usuariosMock = [
    {
        id: 1,
        nome: 'Administrador Site',
        email: 'admin@documenta.com',
        senha: '123456',
        role: 'ADMIN'
    },
    {
        id: 2,
        nome: 'Líder de Cordoaria',
        email: 'lider.cordoaria@quilombo.com',
        senha: 'cordoaria0800',
        role: 'LIDER',
        quilombo_id: 1
    },
    {
        id: 3,
        nome: 'Líder de Quingoma',
        email: 'lider.quingoma@quilombo.com',
        senha: 'quingoma007',
        role: 'LIDER',
        quilombo_id: 2
    }
];


// login do usuário
export const loginAuth = (req, res) => {
    const { email, senha } = req.body;
    const usuarioEncontrado = usuariosMock.find(
        usuario => usuario.email === email && usuario.senha === senha
    );

    if (!usuarioEncontrado) {
        return res.status(401).json({
            erro: 'Credenciais inválidas. E-mail ou senha incorretos.'
        });
    }

    const usuario = { ...usuarioEncontrado };
    delete usuario.senha;

    return res.status(200).json({
        mensagem: 'Login realizado com sucesso (Mock)!',
        token: criarToken(usuario),
        usuario
    });
};