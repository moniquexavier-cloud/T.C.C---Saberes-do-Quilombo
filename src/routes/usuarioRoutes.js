import { Router } from 'express';
import { criarUsuario, listarUsuarios } from '../controllers/usuarioController.js';
import {
    cadastroSchema,
    validate
} from '../schemas/UsuarioSchema.js';

const router = Router();

// GET: Lista de Usuários
router.get('/', listarUsuarios);

// POST: Cadastro
router.post(
    '/cadastro', 
    validate(cadastroSchema),
    criarUsuario
);


export default router;