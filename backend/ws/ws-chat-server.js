const WebSocket = require('ws');
const db = require('./database.js'); // Ajuste o caminho se necessário

// --- MUDANÇA 1: Simulação de Usuários ---
// Criamos um objeto para simular a tabela 'usuarios'.
// A chave é o ID do usuário, e o valor é o nome.
const fakeUsers = {
  1: 'João',
  2: 'Maria',
  3: 'Carlos',
  // Adicione mais usuários falsos conforme precisar
};

const wss = new WebSocket.Server({ port: 3001 });
console.log('Servidor WebSocket rodando em ws://localhost:3001');

wss.on('connection', function connection(ws) {
  // --- MUDANÇA 2: Ajuste na busca de histórico ---
  // Removemos o JOIN e selecionamos o id_usuario para podermos
  // buscar o nome no nosso objeto 'fakeUsers'.
  const sqlHistorico = `
    SELECT id, id_usuario, conteudo, tipo, data_envio, status
    FROM mensagens
    WHERE status = 'ativo'
    ORDER BY id ASC
  `;

  db.all(sqlHistorico, [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar histórico de mensagens:", err);
      return;
    }

    if (rows) {
      rows.forEach(msg => {
        // Para cada mensagem, buscamos o nome do usuário no nosso objeto de simulação.
        // Se o ID não for encontrado, usamos 'Visitante' como padrão.
        const userName = fakeUsers[msg.id_usuario] || 'Visitante';

        ws.send(JSON.stringify({
            usuario: userName,
            texto: msg.conteudo,
            tipo: msg.tipo,
            data_envio: msg.data_envio
        }));
      });
    }
  });

  ws.on('message', function incoming(message) {
    let msgObj;
    try {
      msgObj = JSON.parse(message);
    } catch (e) {
      console.error("Erro: Mensagem recebida não é um JSON válido.", e);
      return;
    }

    // A lógica de salvar no banco continua a mesma, o que é ótimo!
    // Assim, quando você criar a tabela 'usuarios', as mensagens já estarão corretas.
    const sqlInsert = `
      INSERT INTO mensagens (id_usuario, id_grupo, conteudo, tipo)
      VALUES (?, ?, ?, ?)
    `;
    
    db.run(
        sqlInsert,
        [msgObj.id_usuario, msgObj.id_grupo, msgObj.conteudo, msgObj.tipo],
        function (err) {
            if (err) {
                console.error('Erro ao salvar mensagem:', err.message);
                return; // Adicionado para não continuar em caso de erro
            }
            
            console.log(`Mensagem de id ${this.lastID} salva com sucesso.`);

            // --- MUDANÇA 3: Ajuste no broadcast de novas mensagens ---
            // Em vez de consultar o banco, buscamos o nome no objeto de simulação.
            const userName = fakeUsers[msgObj.id_usuario] || 'Visitante';
            
            const mensagemParaBroadcast = {
                usuario: userName,
                texto: msgObj.conteudo,
                tipo: msgObj.tipo,
                data_envio: new Date().toISOString()
            };

            const msgString = JSON.stringify(mensagemParaBroadcast);
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(msgString);
                }
            });
        }
    );
  });
});