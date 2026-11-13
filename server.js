import 'dotenv/config';
import app from './app.js';
import connectDB from './src/models/database.js'; 

const PORT = process.env.PORT || 3000;

// Conecta ao banco antes de iniciar o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});