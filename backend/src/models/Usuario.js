const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

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

async function criarUsuario(dados) {
    console.log('DEBUG criarUsuario - dados recebidos:', dados);
    const { nomeCompleto, email, curso, periodo, senha } = dados;

    // Validação de e-mail institucional
    if (!/.+@unisanta\.br$/.test(email) && !/.+@alunos\.unisanta\.br$/.test(email)) {
        throw new Error(`${email} não é um e-mail institucional válido!`);
    }

    // Validação da senha
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(senha)) {
        throw new Error('A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número.');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO usuarios (nomeCompleto, email, curso, periodo, senha)
             VALUES (?, ?, ?, ?, ?)`,
            [nomeCompleto, email, curso, periodo, hashedPassword],
            function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, nomeCompleto, email, curso, periodo });
            }
        );
    });
}

function listarUsuarios() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT id, nomeCompleto, email, curso, periodo FROM usuarios`, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

module.exports = { criarUsuario, listarUsuarios };