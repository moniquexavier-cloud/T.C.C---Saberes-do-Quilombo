import { Router } from 'express';
import {
  criarUsuario,
  listarUsuarios,
  loginAuth
} from '../controllers/usuarioController.js';
import { cadastroSchema, loginSchema, validate } from '../schemas/UsuarioSchema.js';
import { autenticar, exigirAdmin } from '../middleware/auth.js';

const router = Router();

// Somente ADMIN autenticado pode listar usuários ou cadastrar novos.
router.get('/', autenticar, exigirAdmin, listarUsuarios);

router.post(
  '/cadastro',
  autenticar,
  exigirAdmin,
  validate(cadastroSchema),
  criarUsuario
);

// Login permanece público.
router.post(
  '/login',
  validate(loginSchema),
  loginAuth
);

export default router;