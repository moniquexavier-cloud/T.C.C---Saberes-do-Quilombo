import { Router } from 'express';
import { getQuilomboCards } from '../controllers/quilomboCardsController.js';

const router = Router();

// Rota GET para listar os cards
router.get('/', getQuilomboCards);

export default router;