import { Router } from 'express';
import { criarUsuario, listarUsuarios, loginAuth } from '../controllers/usuarioController.js';
import { cadastroSchema, loginSchema, validate } from '../schemas/UsuarioSchema.js';

const router = Router();

// GET: Lista de Usuários
router.get('/', listarUsuarios);

// POST: Cadastro
router.post(
    '/cadastro', 
    validate(cadastroSchema),
    criarUsuario
);

// POST: Login
router.post(
    '/login',
    validate(loginSchema),
    loginAuth
);


export default router;