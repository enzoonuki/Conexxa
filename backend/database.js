const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'conexxa.db');
const db = new sqlite3.Database(dbPath);

// Criação das tabelas
// Usuários
const createUsuarios = `
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
`;

// Grupos
const createGrupos = `
CREATE TABLE IF NOT EXISTS grupos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL
);
`;

// Mensagens
const createMensagens = `
CREATE TABLE IF NOT EXISTS mensagens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  id_grupo INTEGER NOT NULL,
  conteudo TEXT,
  tipo TEXT CHECK(tipo IN ('texto','imagem','arquivo')) NOT NULL,
  data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT CHECK(status IN ('ativo','deletado')) DEFAULT 'ativo',
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_grupo) REFERENCES grupos(id)
);
`;

db.serialize(() => {
  db.run(createUsuarios);
  db.run(createGrupos);
  db.run(createMensagens);
  console.log('Tabelas criadas com sucesso!');
});

db.close();
