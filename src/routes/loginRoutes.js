
import { Router } from 'express';

import { loginAuth } from '../controllers/loginAuth.js';

import {
    loginSchema,
    validate
} from '../middleware/validators.js';

const router = Router();


// POST: Login
router.post(
    '/login',
    validate(loginSchema),
    loginAuth
);

export default router;
