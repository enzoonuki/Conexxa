// Espera o HTML carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Pegar referências dos elementos do HTML
    const messageForm = document.getElementById('message-form');
    const messageContent = document.getElementById('message-content');
    const messageType = document.getElementById('message-type');
    const groupId = document.getElementById('group-id');
    const sendButton = document.getElementById('send-button');
    const statusMessage = document.getElementById('status-message');

    // 2. Adicionar um "ouvinte" para o evento de envio do formulário
    messageForm.addEventListener('submit', (event) => {
        // Previne o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault();

        // Pega os valores dos campos
        const conteudo = messageContent.value;
        const tipo = messageType.value;
        const id_grupo = groupId.value;

        // Validação simples
        if (!conteudo.trim() || !id_grupo) {
            showStatus('Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Monta o objeto da mensagem, exatamente como o backend espera
        const messageData = {
            id_usuario: 0, // ID 0 pode representar o Administrador
            id_grupo: parseInt(id_grupo), // Converte para número
            conteudo: conteudo,
            tipo: tipo
        };

        // Simula o envio para o backend (ex: para seu servidor WebSocket)
        sendMessage(messageData);
    });

    // 3. Função para simular o envio e dar feedback
    function sendMessage(data) {
        console.log("Enviando dados para o backend:", data);

        // Desabilita o botão para prevenir múltiplos cliques
        sendButton.disabled = true;
        sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simula um tempo de espera da rede (1.5 segundos)
        setTimeout(() => {
            // Simulação de sucesso
            const success = true; // Mude para 'false' para testar o erro

            if (success) {
                showStatus('Mensagem enviada com sucesso!', 'success');
                messageForm.reset(); // Limpa o formulário
            } else {
                showStatus('Erro ao enviar a mensagem. Tente novamente.', 'error');
            }

            // Habilita o botão novamente
            sendButton.disabled = false;
            sendButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';

        }, 1500);
    }

    // 4. Função para mostrar as mensagens de status (sucesso/erro)
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status ${type}`; // Adiciona a classe 'success' ou 'error'

        // Esconde a mensagem depois de 5 segundos
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    }
});