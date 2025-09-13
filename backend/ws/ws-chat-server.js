const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Banco de dados SQLite
const dbPath = path.join(__dirname, 'chat.db');
const db = new sqlite3.Database(dbPath);

// Cria tabela de mensagens se não existir
db.run(`CREATE TABLE IF NOT EXISTS mensagens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario TEXT,
  texto TEXT,
  tipo TEXT,
  url TEXT,
  data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
  // Ao conectar, envia o histórico de mensagens
  db.all('SELECT usuario, texto, tipo, url FROM mensagens ORDER BY id ASC', [], (err, rows) => {
    if (!err && rows) {
      rows.forEach(msg => {
        ws.send(JSON.stringify(msg));
      });
    }
  });

  ws.on('message', function incoming(message) {
    let msgObj;
    try {
      msgObj = JSON.parse(message);
    } catch (e) {
      return;
    }
    // Salva mensagem no banco
    db.run(
      'INSERT INTO mensagens (usuario, texto, tipo, url) VALUES (?, ?, ?, ?)',
      [msgObj.usuario, msgObj.texto, msgObj.tipo, msgObj.url || null],
      function (err) {
        if (err) {
          console.error('Erro ao salvar mensagem:', err);
        }
      }
    );
    // Repasse a mensagem para todos os clientes conectados
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log('Servidor WebSocket rodando em ws://localhost:3001');
