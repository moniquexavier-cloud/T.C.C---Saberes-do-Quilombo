import { Router } from 'express';

import {
    getRelatos,
    createRelato,
    patchRelato,
    deleteRelato
} from '../controllers/relatosController.js';

import {
    criarRelatoSchema,
    editarRelatoSchema,
    idRelatoSchema,
    validate
} from '../schemas/relatosSchema.js';
import { autenticar } from '../middleware/auth.js';

const router = Router();

// GET: Listar relatos
router.get('/', getRelatos);

// POST: Criar relato
router.post(
    '/',
    autenticar,
    validate(criarRelatoSchema),
    createRelato
);

// PATCH: Editar relato
router.patch(
    '/:id',
    autenticar,
    validate(idRelatoSchema, 'params'),
    validate(editarRelatoSchema),
    patchRelato
);

// DELETE: Excluir relato
router.delete(
    '/:id',
    autenticar,
    validate(idRelatoSchema, 'params'),
    deleteRelato
);

export default router;