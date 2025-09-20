
jest.setTimeout(30000);

const request = require('supertest');
const app = require('../src/controllers/app');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../../database/conexxa.db');

beforeAll((done) => {
    // força a criação do banco quando o app for importado
    console.log('DIR DO TESTE:', __dirname);
    require('../src/models/Usuario');
    // pequena espera para o SQLite criar tabela
    setTimeout(done, 200);
});


afterAll(() => {
    // fecha conexão se quiser (opcional)
    const db = new sqlite3.Database(dbPath);
    db.close();
});

describe('UsuarioController (SQLite)', () => {
    it('deve criar um usuário válido', async () => {
        const usuario = {
            nomeCompleto: 'Enzo Teste',
            email: 'eo228424@alunos.unisanta.br',
            curso: 'Sistemas de Informação',
            periodo: 'noite',
            senha: 'Senha123'
        };

        const res = await request(app)
            .post('/usuarios')
            .send(usuario);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe(usuario.email);
    });

    it('deve listar os usuários cadastrados', async () => {
        const res = await request(app).get('/usuarios');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('email');
    });

    it('não deve aceitar email fora do domínio unisanta', async () => {
        const usuario = {
            nomeCompleto: 'Email Invalido',
            email: 'teste@gmail.com',
            curso: 'Engenharia',
            periodo: 'noite',
            senha: 'Senha123'
        };
        

        const res = await request(app)
            .post('/usuarios')
            .send(usuario);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
