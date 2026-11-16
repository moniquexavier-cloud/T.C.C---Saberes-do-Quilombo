import express from 'express';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import quilomboCardsRoutes from './src/routes/quilomboCardsRoutes.js';
import quilomboInfoRoutes from './src/routes/quilomboInfoRoutes.js';
import quilomboFontRoutes from './src/routes/quilomboFontRoutes.js';
import relatosRoutes from './src/routes/relatosRoutes.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js';

const app = express();
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

// Quilombos
app.use('/api/quilombos/cards', quilomboCardsRoutes);
app.use('/api/quilombos', quilomboInfoRoutes);

// Fontes
app.use('/api/fontes', quilomboFontRoutes);

// Usuários (Login, Cadastro e Listagem)
app.use('/api/usuarios', usuarioRoutes);

// Relatos
app.use('/api/relatos', relatosRoutes);

app.use('/images', express.static(path.join(projectDirectory, 'images')));
app.use(express.static(path.join(projectDirectory, 'src', 'view')));

export default app;