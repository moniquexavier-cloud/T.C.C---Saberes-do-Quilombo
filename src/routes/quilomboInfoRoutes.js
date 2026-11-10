import { Router } from 'express';
import { getQuilomboInfo } from '../controllers/quilomboInfoController.js';
import { nomeQuilomboSchema, validate } from '../schemas/quilomboInfoSchema.js';

const router = Router();

// Rota GET para listar as informações do quilombo
router.get('/:nome', validate(nomeQuilomboSchema, 'params'), getQuilomboInfo);

export default router;