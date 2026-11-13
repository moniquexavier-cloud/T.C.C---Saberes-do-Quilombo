import { criarToken } from '../middleware/auth.js';
import Usuario from '../models/usuariosModel.js';
import { cadastroSchema, loginSchema } from '../schemas/UsuarioSchema.js';
import bcrypt from 'bcryptjs';


// Listar usuários
export const listarUsuarios = async (req, res) => {
  try {
  const usuarios = await Usuario.find().select('-senha');
  return res.status(200).json(usuarios);
 } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar usuários.', detalhes: error.message });
  }
};

// Criar novos usuários
export const criarUsuario = async (req, res) => {
  try {
    // 1. Validação do Zod 
    const validation = cadastroSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        mensagem: 'Erro de validação nos dados enviados.',
        errors: validation.error.issues
      });
    }


const { nome, email, senha, role, quilombo_id } = validation.data;


// 2. Verifica se o usuário já existe no banco
    const usuarioExists = await Usuario.findOne({ email });
    if (usuarioExists) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }


    // 3. Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);


    // 4. Salva no MongoDB
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedSenha,
      role,
      quilombo_id,
      dataCriacao: new Date().toISOString()
    });




return res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        role: novoUsuario.role,
        quilombo_id: novoUsuario.quilombo_id
      }
    });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao criar usuário.', detalhes: error.message });
  }
};


// Login do usuário
export const loginAuth = async (req, res) => {
  try {
    // 1. Validação do Zod para o login
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        mensagem: 'Dados de login inválidos.',
        errors: validation.error.issues
      });
    }


    const { email, senha } = validation.data;


    // 2. Procura o usuário pelo e-mail no MongoDB (já vem em minúsculas e sem espaços pelo Zod)
    const usuarioEncontrado = await Usuario.findOne({ email });


if (!usuarioEncontrado) {
      return res.status(401).json({
        erro: 'Credenciais inválidas. E-mail ou senha incorretos.'
      });
    }


    // 3. Compara a senha digitada com o hash salvo no banco
    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);


    if (!senhaValida) {
      return res.status(401).json({
        erro: 'Credenciais inválidas. E-mail ou senha incorretos.'
      });
    }


    // 4. Remove a senha antes de gerar o token
    const usuario = usuarioEncontrado.toObject();
    delete usuario.senha;


    const token = criarToken(usuario);


    return res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario
    });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao realizar login.', detalhes: error.message });
  }
};