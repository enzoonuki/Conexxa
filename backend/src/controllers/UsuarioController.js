const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const { criarUsuario, listarUsuarios } = require('../models/Usuario');

// Caminho para o arquivo do banco de dados
const dbPath = path.resolve(__dirname, '../../../database/conexxa.db');



// Conexão com o SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco SQLite em:', dbPath);
    }
});

// Cria a tabela se não existir
db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeCompleto TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    curso TEXT NOT NULL,
    periodo TEXT NOT NULL,
    senha TEXT NOT NULL
)
`);

class UsuarioController {
    async criarUsuario(req, res) {
        try {
            const usuario = await criarUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            console.error('Erro em criarUsuario:', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    async listarUsuarios(req, res) {
        try {
            const usuarios = await listarUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UsuarioController;