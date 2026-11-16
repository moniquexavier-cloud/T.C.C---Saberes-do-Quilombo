
import { Router } from 'express';

import { loginAuth } from '../controllers/usuarioController.js';

import {
    loginSchema,
    validate
} from '../schemas/UsuarioSchema.js';

const router = Router();


// POST: Login
router.post(
    '/login',
    validate(loginSchema),
    loginAuth
);

export default router;
