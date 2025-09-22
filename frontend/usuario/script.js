document.addEventListener('DOMContentLoaded', () => {

    // 1. Simulação de dados que viriam do seu backend (via WebSocket ou API)
    const sampleMessages = [
        {
            id: 1,
            id_usuario: 0,
            id_grupo: 1,
            conteudo: "Lembrete: A entrega do Projeto Final é na próxima sexta-feira. Não deixem para a última hora!",
            tipo: "aviso",
            data_envio: "2025-09-21T10:00:00Z"
        },
        {
            id: 2,
            id_usuario: 0,
            id_grupo: 1,
            conteudo: "Sejam bem-vindos ao novo semestre! Desejamos a todos muito sucesso e aprendizado.",
            tipo: "texto",
            data_envio: "2025-09-20T14:30:00Z"
        },
        {
            id: 3,
            id_usuario: 0,
            id_grupo: 2,
            conteudo: "https://i.imgur.com/example.png", // Link de uma imagem de exemplo
            tipo: "imagem",
            data_envio: "2025-09-19T18:00:00Z"
        }
    ];

    const announcementBoard = document.getElementById('announcement-board');

    // Função principal que recebe os dados e exibe na tela
    function displayMessages(messages) {
        // Limpa o conteúdo estático, mantendo o título
        const title = announcementBoard.querySelector('h2').outerHTML;
        announcementBoard.innerHTML = title;

        // Itera sobre cada mensagem e a adiciona ao mural
        messages.forEach(message => {
            const messageCard = createMessageCard(message);
            announcementBoard.appendChild(messageCard);
        });
    }

    // Função que cria um card de mensagem HTML a partir de um objeto de dados
    function createMessageCard(message) {
        const card = document.createElement('div');
        card.className = `message-card type-${message.tipo}`; // Ex: "message-card type-aviso"

        // Define ícones e títulos com base no tipo da mensagem
        let iconClass = 'fas fa-comment-dots';
        let typeTitle = 'Mensagem Geral';

        if (message.tipo === 'aviso') {
            iconClass = 'fas fa-triangle-exclamation';
            typeTitle = 'Aviso Importante';
        } else if (message.tipo === 'imagem') {
            iconClass = 'fas fa-image';
            typeTitle = 'Imagem Compartilhada';
        }

        // Formata a data para uma leitura mais fácil
        const sentDate = new Date(message.data_envio).toLocaleDateString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });

        // Trata o conteúdo para o caso de ser uma imagem
        let contentHTML = `<p>${message.conteudo}</p>`;
        if (message.tipo === 'imagem') {
            contentHTML = `<img src="${message.conteudo}" alt="Imagem compartilhada">`;
        }
        
        // Cria a estrutura interna do card
        card.innerHTML = `
            <div class="card-header">
                <i class="${iconClass}"></i>
                <span>${typeTitle}</span>
            </div>
            <div class="card-body">
                ${contentHTML}
            </div>
            <div class="card-footer">
                Enviado por: Administrador em ${sentDate}
            </div>
        `;

        return card;
    }

    // Inicializa a exibição das mensagens quando a página carrega
    displayMessages(sampleMessages);

});