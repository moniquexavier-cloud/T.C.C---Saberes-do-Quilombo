import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import connectDB from '../src/models/database.js';

describe('Testes de Integração da API - Saberes do Quilombo', () => {
  // Conecta ao MongoDB Atlas antes de iniciar os testes
  beforeAll(async () => {
    await connectDB();
  });

  // Fecha a conexão ao finalizar 
  afterAll(async () => {
    await mongoose.connection.close();
  });

test('Deve bloquear listagem de usuários sem token', async () => {
  const resposta = await request(app).get('/api/usuarios');

  expect(resposta.statusCode).toBe(401);
});

  test('Deve recusar login com senha incorreta', async () => {
    const resposta = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'exemplo@gmail.com',
        senha: 'senha_errada'
      });

    expect([400, 401]).toContain(resposta.statusCode);
  });

  test('Deve listar os relatos', async () => {
    const resposta = await request(app).get('/api/relatos');

    expect(resposta.statusCode).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  test('Deve bloquear criação de relato sem token JWT', async () => {
    const resposta = await request(app)
      .post('/api/relatos')
      .send({
        quilombo_id: 1,
        texto: 'Tentativa de relato sem autenticação'
      });

    expect(resposta.statusCode).toBe(401);
  });
});