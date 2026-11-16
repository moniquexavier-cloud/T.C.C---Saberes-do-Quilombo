import { Router } from 'express';
import { getQuilomboCards } from '../controllers/quilomboCardsController.js';

const router = Router();

router.get('/', getQuilomboCards);

export default router;