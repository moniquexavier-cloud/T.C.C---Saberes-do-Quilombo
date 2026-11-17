import { Router } from 'express';
import { getQuilomboFontes } from '../controllers/quilomboFontController.js';

const router = Router();

// Retorna fontes, leis e certificações de uma só vez
router.get('/', getQuilomboFontes);

export default router;