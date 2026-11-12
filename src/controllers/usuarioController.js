import { validate } from '../middleware/validators.js';
import { cadastroSchema } from '../middleware/validators.js';

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

// Listar usuários
export const listarUsuarios = (req, res) => {
  return res.status(200).json(usuariosMock);
};

// Criar novos usuários
export const criarUsuario = (req, res) => {
    const { nome, email, senha, role, quilombo_id } = req.body;

  const novoUsuario = {
    id: usuariosMock.length + 1,
    nome,
    email,
    senha,
    role,
    quilombo_id,
    dataCriacao: new Date().toISOString()
  };

  usuariosMock.push(novoUsuario);

  return res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: novoUsuario
  });
};
