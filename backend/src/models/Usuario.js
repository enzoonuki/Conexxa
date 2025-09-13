const mongoose = require('mongoose');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database(path.resolve(`${process.cwd()}\\database\\conexxa.db`), (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite localizado em:', path.resolve(`${process.cwd()}\\database\\conexxa.db`));
    }
});

// Definindo o modelo de usuário usando o Mongooseconst mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
    nomeCompleto: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    periodo: { type: String, required: true },
    senha: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Função para adicionar um usuário
const addUsuario = async (usuario) => {
    const { nomeCompleto, email, curso, ins, periodo, senha } = usuario;

    // Validação do e-mail
    if (!/.+@unisanta\.br$/.test(email)) {
        throw new Error(`${email} não é um e-mail institucional válido!`);
    }

    // Validação da senha
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(senha)) {
        throw new Error('A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número.');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserindo o usuário no banco de dados SQLite
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO usuarios (nomeCompleto, email, curso, ins, periodo, senha) VALUES (?, ?, ?, ?, ?, ?)`, 
            [nomeCompleto, email, curso, ins, periodo, hashedPassword], 
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    // Inserindo o usuário no banco de dados MongoDB
                    const novoUsuario = new Usuario({
                        nomeCompleto,
                        email,
                        curso,
                        ins,
                        periodo,
                        senha: hashedPassword
                    });
                    novoUsuario.save((err, usuarioSalvo) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(usuarioSalvo);
                        }
                    });
                }
            });
    });
};

module.exports = {
    addUsuario
};