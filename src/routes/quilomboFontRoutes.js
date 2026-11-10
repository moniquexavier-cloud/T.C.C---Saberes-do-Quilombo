import { Router } from 'express';
import { getQuilomboFontes } from '../controllers/quilomboFontController.js';

const router = Router();

// Rota GET para listar as fontes
router.get('/', getQuilomboFontes);

export default router;