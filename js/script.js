document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Lógica simulada para a tela de login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio real do formulário
            
            // Simulação de autenticação bem-sucedida
            console.log('Tentativa de login com os seguintes dados:');
            console.log('Email:', loginForm.email.value);
            console.log('Senha:', loginForm.password.value);

            // Definir autenticação
            setAuthentication();
            
            alert('Login bem-sucedido! Redirecionando para a página principal.');
            
            // Redireciona para o dashboard após login bem-sucedido
            window.location.href = 'dashboard.html'; 
        });
    }

    // Lógica simulada para a tela de cadastro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio real do formulário

            console.log('Tentativa de cadastro com os seguintes dados:');
            console.log('Nome Completo:', registerForm.fullname.value);
            console.log('Email:', registerForm.email.value);
            console.log('Curso:', registerForm.course.value);
            console.log('Semestre:', registerForm.semester.value);

            alert('Cadastro realizado com sucesso! Redirecionando para a tela de login.');

            // Redireciona o usuário para a página de login após o cadastro
            window.location.href = 'login.html';
        });
    }
});

// Funcionalidades do Dashboard
function navigateTo(section) {
    console.log(`Navegando para a seção: ${section}`);
    
    // Simulação de navegação para diferentes seções
    switch(section) {
        case 'grupos':
            window.location.href = 'grupos.html';
            break;
        case 'notificacoes':
            window.location.href = 'notificacoes.html';
            break;
        case 'atividades':
            window.location.href = 'atividades.html';
            break;
        case 'materiais':
            window.location.href = 'materiais.html';
            break;
        case 'adicionar-amigos':
            alert('Abrindo busca de amigos...');
            // window.location.href = 'adicionar-amigos.html';
            break;
        case 'amigos':
            window.location.href = 'amigos.html';
            break;
        default:
            console.log('Seção não encontrada');
    }
}

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        alert('Logout realizado com sucesso!');
        // Limpar dados de sessão (localStorage, sessionStorage, etc.)
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirecionar para a página de login
        window.location.href = 'login.html';
    }
}

// Verificar se o usuário está autenticado (simulação)
function checkAuthentication() {
    // Esta função seria chamada ao carregar páginas que requerem autenticação
    const isAuthenticated = localStorage.getItem('userAuthenticated');
    
    if (!isAuthenticated && window.location.pathname.includes('dashboard.html')) {
        alert('Você precisa fazer login para acessar esta página.');
        window.location.href = 'login.html';
    }
}

// Simular autenticação ao fazer login
function setAuthentication() {
    localStorage.setItem('userAuthenticated', 'true');
    localStorage.setItem('userInfo', JSON.stringify({
        name: 'João Silva Santos',
        course: 'Engenharia de Software',
        semester: '5º Semestre',
        email: 'joao.silva@instituicao.com'
    }));
}

// Carregar informações do usuário no dashboard
function loadUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (userInfo && document.querySelector('.user-details')) {
        document.querySelector('.user-details h2').textContent = userInfo.name;
        document.querySelector('.user-details p').textContent = userInfo.course;
        document.querySelector('.user-details span').textContent = userInfo.semester;
    }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticação
    checkAuthentication();
    
    // Carregar informações do usuário se estivermos no dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        loadUserInfo();
    }
});

// Funcionalidades da página de Grupos
function goBack() {
    window.location.href = 'dashboard.html';
}

function showTab(tabName) {
    // Remover classe active de todas as tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Adicionar classe active na tab selecionada
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function viewGroup(groupId) {
    alert(`Abrindo detalhes do grupo: ${groupId}`);
    // Aqui seria redirecionado para uma página de detalhes do grupo
    // window.location.href = `grupo-detalhes.html?id=${groupId}`;
}

function leaveGroup(groupId) {
    if (confirm('Tem certeza que deseja sair deste grupo?')) {
        alert(`Você saiu do grupo: ${groupId}`);
        // Aqui seria feita a requisição para o backend
        // Recarregar a página ou atualizar a lista
        location.reload();
    }
}

function joinGroup(groupId) {
    if (confirm('Deseja ingressar neste grupo?')) {
        alert(`Você ingressou no grupo: ${groupId}!`);
        // Aqui seria feita a requisição para o backend
        // Recarregar a página ou atualizar a lista
        location.reload();
    }
}

function toggleSemesterField() {
    const groupType = document.getElementById('group-type').value;
    const semesterRow = document.getElementById('semester-row');
    
    if (groupType === 'especifico') {
        semesterRow.style.display = 'block';
        document.getElementById('target-semester').required = true;
    } else {
        semesterRow.style.display = 'none';
        document.getElementById('target-semester').required = false;
    }
}

function searchMembers() {
    const searchTerm = document.getElementById('member-search').value;
    if (searchTerm.trim() === '') {
        alert('Digite um nome ou email para buscar');
        return;
    }
    
    // Simulação de busca de membros
    const mockResults = [
        { id: 1, name: 'Maria Silva', email: 'maria.silva@instituicao.com' },
        { id: 2, name: 'Pedro Santos', email: 'pedro.santos@instituicao.com' },
        { id: 3, name: 'Ana Costa', email: 'ana.costa@instituicao.com' }
    ];
    
    // Filtrar resultados baseado no termo de busca
    const results = mockResults.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (results.length > 0) {
        // Adicionar o primeiro resultado encontrado
        addMemberToGroup(results[0]);
        document.getElementById('member-search').value = '';
    } else {
        alert('Nenhum usuário encontrado com esse termo');
    }
}

function addMemberToGroup(member) {
    const selectedMembers = document.getElementById('selected-members');
    
    // Verificar se o membro já foi adicionado
    if (selectedMembers.querySelector(`[data-member-id="${member.id}"]`)) {
        alert('Este membro já foi adicionado');
        return;
    }
    
    // Criar elemento do membro
    const memberTag = document.createElement('div');
    memberTag.className = 'member-tag';
    memberTag.setAttribute('data-member-id', member.id);
    memberTag.innerHTML = `
        ${member.name}
        <button class="remove-member" onclick="removeMemberFromGroup(${member.id})">×</button>
    `;
    
    selectedMembers.appendChild(memberTag);
}

function removeMemberFromGroup(memberId) {
    const memberTag = document.querySelector(`[data-member-id="${memberId}"]`);
    if (memberTag) {
        memberTag.remove();
    }
}

function clearForm() {
    if (confirm('Tem certeza que deseja limpar todos os campos?')) {
        document.getElementById('create-group-form').reset();
        document.getElementById('selected-members').innerHTML = '';
        document.getElementById('semester-row').style.display = 'none';
    }
}

// Event listener para o formulário de criação de grupo
document.addEventListener('DOMContentLoaded', () => {
    const createGroupForm = document.getElementById('create-group-form');
    
    if (createGroupForm) {
        createGroupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(createGroupForm);
            const groupData = {
                name: formData.get('groupName'),
                course: formData.get('course'),
                maxMembers: formData.get('maxMembers'),
                groupType: formData.get('groupType'),
                targetSemester: formData.get('targetSemester'),
                description: formData.get('description')
            };
            
            // Coletar membros selecionados
            const selectedMembers = document.querySelectorAll('.member-tag');
            const members = Array.from(selectedMembers).map(tag => ({
                id: tag.getAttribute('data-member-id'),
                name: tag.textContent.replace('×', '').trim()
            }));
            
            console.log('Dados do grupo:', groupData);
            console.log('Membros selecionados:', members);
            
            alert(`Grupo "${groupData.name}" criado com sucesso!`);
            
            // Redirecionar para a aba "Meus Grupos"
            showTab('meus-grupos');
            clearForm();
        });
    }
    
    // Funcionalidade de busca em tempo real
    const searchInput = document.getElementById('search-groups');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const groupCards = document.querySelectorAll('#ingressar .group-card');
            
            groupCards.forEach(card => {
                const groupName = card.querySelector('h4').textContent.toLowerCase();
                const groupCourse = card.querySelector('.group-info p').textContent.toLowerCase();
                
                if (groupName.includes(searchTerm) || groupCourse.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Funcionalidade dos filtros
    const filterCourse = document.getElementById('filter-course');
    const filterSemester = document.getElementById('filter-semester');
    
    if (filterCourse && filterSemester) {
        [filterCourse, filterSemester].forEach(filter => {
            filter.addEventListener('change', applyFilters);
        });
    }
});

function applyFilters() {
    const courseFilter = document.getElementById('filter-course').value;
    const semesterFilter = document.getElementById('filter-semester').value;
    const groupCards = document.querySelectorAll('#ingressar .group-card');
    
    groupCards.forEach(card => {
        let showCard = true;
        
        // Filtro por curso
        if (courseFilter) {
            const cardCourse = card.querySelector('.group-info p').textContent;
            if (!cardCourse.toLowerCase().includes(courseFilter.replace('-', ' '))) {
                showCard = false;
            }
        }
        
        // Filtro por semestre
        if (semesterFilter) {
            const cardType = card.querySelector('.group-type').textContent;
            if (!cardType.includes(`${semesterFilter}º`)) {
                showCard = false;
            }
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Funcionalidades da página de Atividades
let currentEditingActivity = null;

function toggleView(viewType) {
    const viewButtons = document.querySelectorAll('.view-btn');
    const activitiesList = document.getElementById('activities-list');
    
    viewButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (viewType === 'grid') {
        activitiesList.style.display = 'grid';
        activitiesList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        activitiesList.style.gap = '20px';
    } else {
        activitiesList.style.display = 'block';
        activitiesList.style.gridTemplateColumns = 'none';
        activitiesList.style.gap = 'normal';
    }
}

function openAddActivityModal() {
    const modal = document.getElementById('activity-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('activity-form');
    
    modalTitle.textContent = 'Nova Atividade';
    form.reset();
    currentEditingActivity = null;
    
    modal.classList.add('show');
}

function closeActivityModal() {
    const modal = document.getElementById('activity-modal');
    modal.classList.remove('show');
    currentEditingActivity = null;
}

function editActivity(activityId) {
    const modal = document.getElementById('activity-modal');
    const modalTitle = document.getElementById('modal-title');
    
    modalTitle.textContent = 'Editar Atividade';
    currentEditingActivity = activityId;
    
    // Aqui você carregaria os dados da atividade para edição
    // Por enquanto, apenas abrimos o modal
    modal.classList.add('show');
    
    alert(`Editando atividade ID: ${activityId}`);
}

function toggleActivityStatus(activityId) {
    const activityItem = document.querySelector(`[data-activity-id="${activityId}"]`) || 
                        document.querySelectorAll('.activity-item')[activityId - 1];
    
    if (!activityItem) return;
    
    const statusElement = activityItem.querySelector('.activity-status');
    const currentStatus = activityItem.getAttribute('data-status');
    
    let newStatus;
    if (currentStatus === 'por-fazer') {
        newStatus = 'em-andamento';
    } else if (currentStatus === 'em-andamento') {
        newStatus = 'concluida';
    } else {
        newStatus = 'por-fazer';
    }
    
    // Atualizar o status visual
    statusElement.className = `activity-status ${newStatus}`;
    activityItem.setAttribute('data-status', newStatus);
    
    // Atualizar o ícone
    const icon = statusElement.querySelector('i');
    if (newStatus === 'por-fazer') {
        icon.className = 'fas fa-circle';
    } else if (newStatus === 'em-andamento') {
        icon.className = 'fas fa-play';
    } else {
        icon.className = 'fas fa-check';
    }
    
    updateSummaryCounters();
    alert(`Status da atividade alterado para: ${newStatus.replace('-', ' ')}`);
}

function deleteActivity(activityId) {
    if (confirm('Tem certeza que deseja excluir esta atividade?')) {
        const activityItem = document.querySelector(`[data-activity-id="${activityId}"]`) || 
                            document.querySelectorAll('.activity-item')[activityId - 1];
        
        if (activityItem) {
            activityItem.remove();
            updateSummaryCounters();
            alert('Atividade excluída com sucesso!');
        }
    }
}

function updateSummaryCounters() {
    const activities = document.querySelectorAll('.activity-item');
    let pendingCount = 0;
    let progressCount = 0;
    let completedCount = 0;
    let urgentCount = 0;
    
    activities.forEach(activity => {
        const status = activity.getAttribute('data-status');
        const dateElement = activity.querySelector('.activity-date');
        const isUrgent = dateElement && dateElement.classList.contains('urgent');
        
        if (status === 'por-fazer') {
            pendingCount++;
            if (isUrgent) urgentCount++;
        } else if (status === 'em-andamento') {
            progressCount++;
            if (isUrgent) urgentCount++;
        } else if (status === 'concluida') {
            completedCount++;
        }
    });
    
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('progress-count').textContent = progressCount;
    document.getElementById('completed-count').textContent = completedCount;
    document.getElementById('urgent-count').textContent = urgentCount;
}

function applyActivityFilters() {
    const statusFilter = document.getElementById('filter-status').value;
    const typeFilter = document.getElementById('filter-type').value;
    const groupFilter = document.getElementById('filter-group').value;
    const activities = document.querySelectorAll('.activity-item');
    
    activities.forEach(activity => {
        let showActivity = true;
        
        // Filtro por status
        if (statusFilter && activity.getAttribute('data-status') !== statusFilter) {
            showActivity = false;
        }
        
        // Filtro por tipo
        if (typeFilter && activity.getAttribute('data-type') !== typeFilter) {
            showActivity = false;
        }
        
        // Filtro por grupo
        if (groupFilter && activity.getAttribute('data-group') !== groupFilter) {
            showActivity = false;
        }
        
        activity.style.display = showActivity ? 'flex' : 'none';
    });
}

// Event listeners para a página de atividades
document.addEventListener('DOMContentLoaded', () => {
    // Formulário de atividade
    const activityForm = document.getElementById('activity-form');
    if (activityForm) {
        activityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(activityForm);
            const activityData = {
                title: formData.get('title'),
                type: formData.get('type'),
                description: formData.get('description'),
                dueDate: formData.get('dueDate'),
                group: formData.get('group'),
                status: formData.get('status')
            };
            
            console.log('Dados da atividade:', activityData);
            
            if (currentEditingActivity) {
                alert(`Atividade "${activityData.title}" atualizada com sucesso!`);
            } else {
                alert(`Atividade "${activityData.title}" criada com sucesso!`);
                // Aqui você adicionaria a nova atividade à lista
            }
            
            closeActivityModal();
            updateSummaryCounters();
        });
    }
    
    // Filtros
    const filters = ['filter-status', 'filter-type', 'filter-group'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', applyActivityFilters);
        }
    });
    
    // Fechar modal ao clicar fora
    const modal = document.getElementById('activity-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeActivityModal();
            }
        });
    }
    
    // Atualizar contadores na inicialização
    if (document.getElementById('pending-count')) {
        updateSummaryCounters();
    }
});

// Funcionalidades da página de Notificações
function filterNotifications(filter) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const notifications = document.querySelectorAll('.notification-item');
    const noNotificationsDiv = document.querySelector('.no-notifications');
    
    // Atualizar botões ativos
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    let visibleCount = 0;
    
    notifications.forEach(notification => {
        const status = notification.getAttribute('data-status');
        let shouldShow = false;
        
        switch(filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'unread':
                shouldShow = status === 'unread';
                break;
            case 'read':
                shouldShow = status === 'read';
                break;
        }
        
        if (shouldShow) {
            notification.style.display = 'flex';
            visibleCount++;
        } else {
            notification.style.display = 'none';
        }
    });
    
    // Mostrar mensagem se não há notificações
    if (visibleCount === 0) {
        noNotificationsDiv.style.display = 'block';
    } else {
        noNotificationsDiv.style.display = 'none';
    }
}

function markAsRead(notificationId) {
    const notification = document.querySelector(`[data-id="${notificationId}"]`);
    if (notification) {
        notification.classList.remove('unread', 'new');
        notification.classList.add('read');
        notification.setAttribute('data-status', 'read');
        
        // Remover badge "Nova" se existir
        const newBadge = notification.querySelector('.notification-badge-new');
        if (newBadge) {
            newBadge.remove();
        }
        
        // Atualizar botão de controle
        const controlBtn = notification.querySelector('.control-btn');
        controlBtn.innerHTML = '<i class="fas fa-undo"></i>';
        controlBtn.setAttribute('onclick', `markAsUnread(${notificationId})`);
        controlBtn.setAttribute('title', 'Marcar como não lida');
        
        updateNotificationCounters();
    }
}

function markAsUnread(notificationId) {
    const notification = document.querySelector(`[data-id="${notificationId}"]`);
    if (notification) {
        notification.classList.remove('read');
        notification.classList.add('unread');
        notification.setAttribute('data-status', 'unread');
        
        // Atualizar botão de controle
        const controlBtn = notification.querySelector('.control-btn');
        controlBtn.innerHTML = '<i class="fas fa-check"></i>';
        controlBtn.setAttribute('onclick', `markAsRead(${notificationId})`);
        controlBtn.setAttribute('title', 'Marcar como lida');
        
        updateNotificationCounters();
    }
}

function deleteNotification(notificationId) {
    if (confirm('Tem certeza que deseja excluir esta notificação?')) {
        const notification = document.querySelector(`[data-id="${notificationId}"]`);
        if (notification) {
            notification.remove();
            updateNotificationCounters();
            
            // Verificar se ainda há notificações visíveis
            const visibleNotifications = document.querySelectorAll('.notification-item:not([style*="display: none"])');
            if (visibleNotifications.length === 0) {
                document.querySelector('.no-notifications').style.display = 'block';
            }
        }
    }
}

function markAllAsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    
    if (unreadNotifications.length === 0) {
        alert('Não há notificações não lidas.');
        return;
    }
    
    if (confirm(`Marcar ${unreadNotifications.length} notificações como lidas?`)) {
        unreadNotifications.forEach(notification => {
            const id = notification.getAttribute('data-id');
            markAsRead(id);
        });
        
        alert('Todas as notificações foram marcadas como lidas.');
    }
}

function clearAllNotifications() {
    const notifications = document.querySelectorAll('.notification-item');
    
    if (notifications.length === 0) {
        alert('Não há notificações para limpar.');
        return;
    }
    
    if (confirm(`Excluir todas as ${notifications.length} notificações? Esta ação não pode ser desfeita.`)) {
        notifications.forEach(notification => notification.remove());
        document.querySelector('.no-notifications').style.display = 'block';
        updateNotificationCounters();
        alert('Todas as notificações foram excluídas.');
    }
}

function updateNotificationCounters() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    const unreadCount = unreadNotifications.length;
    
    // Atualizar contador na barra de filtros
    const unreadCountElement = document.querySelector('.unread-count');
    if (unreadCountElement) {
        unreadCountElement.textContent = unreadCount;
    }
    
    // Atualizar badge no header
    const headerBadge = document.querySelector('.notification-badge');
    if (headerBadge) {
        headerBadge.textContent = unreadCount;
        if (unreadCount === 0) {
            headerBadge.style.display = 'none';
        } else {
            headerBadge.style.display = 'flex';
        }
    }
}

// Funções específicas para ações das notificações
function acceptInvite(notificationId) {
    alert('Convite aceito! Você foi adicionado ao grupo.');
    markAsRead(notificationId);
    // Aqui seria feita a requisição para o backend
}

function declineInvite(notificationId) {
    alert('Convite recusado.');
    markAsRead(notificationId);
    // Aqui seria feita a requisição para o backend
}

function viewMaterial(notificationId) {
    alert('Abrindo material compartilhado...');
    markAsRead(notificationId);
    // Aqui seria redirecionado para a página de materiais
    // window.location.href = 'materiais.html';
}

function viewActivity(notificationId) {
    alert('Abrindo atividade...');
    markAsRead(notificationId);
    // Aqui seria redirecionado para a página de atividades
    // window.location.href = 'atividades.html';
}

function completeProfile() {
    alert('Redirecionando para completar perfil...');
    // Aqui seria redirecionado para a página de perfil
    // window.location.href = 'perfil.html';
}

// Event listeners para a página de notificações
document.addEventListener('DOMContentLoaded', () => {
    // Atualizar contadores na inicialização da página de notificações
    if (document.querySelector('.notifications-container')) {
        updateNotificationCounters();
    }
    
    // Inicializar funcionalidades da página de materiais
    if (document.querySelector('.materials-container')) {
        initializeMaterialsPage();
    }
});

// Funcionalidades da página de Materiais
function initializeMaterialsPage() {
    // Event listeners para busca e filtros
    const searchInput = document.getElementById('search-materials');
    const groupFilter = document.getElementById('group-filter');
    const typeFilter = document.getElementById('type-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterMaterials);
    }
    
    if (groupFilter) {
        groupFilter.addEventListener('change', filterMaterials);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', filterMaterials);
    }
    
    // Event listener para upload de arquivo
    const fileUploadArea = document.querySelector('.file-upload-area');
    const fileInput = document.getElementById('material-file');
    
    if (fileUploadArea && fileInput) {
        fileUploadArea.addEventListener('click', () => fileInput.click());
        fileUploadArea.addEventListener('dragover', handleDragOver);
        fileUploadArea.addEventListener('drop', handleFileDrop);
        fileInput.addEventListener('change', handleFileSelect);
    }
}

function toggleView(viewType) {
    const materialsGrid = document.getElementById('materials-grid');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Atualizar botões ativos
    viewButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-view="${viewType}"]`).classList.add('active');
    
    // Alternar classe do grid
    if (viewType === 'list') {
        materialsGrid.classList.add('list-view');
    } else {
        materialsGrid.classList.remove('list-view');
    }
}

function filterMaterials() {
    const searchTerm = document.getElementById('search-materials').value.toLowerCase();
    const groupFilter = document.getElementById('group-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    
    const materials = document.querySelectorAll('.material-item');
    const noMaterialsDiv = document.querySelector('.no-materials');
    let visibleCount = 0;
    
    materials.forEach(material => {
        const title = material.querySelector('.material-title').textContent.toLowerCase();
        const description = material.querySelector('.material-description').textContent.toLowerCase();
        const group = material.getAttribute('data-group');
        const type = material.getAttribute('data-type');
        
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesGroup = !groupFilter || group === groupFilter;
        const matchesType = !typeFilter || type === typeFilter;
        
        if (matchesSearch && matchesGroup && matchesType) {
            material.style.display = 'flex';
            visibleCount++;
        } else {
            material.style.display = 'none';
        }
    });
    
    // Mostrar/ocultar mensagem de estado vazio
    if (visibleCount === 0) {
        noMaterialsDiv.style.display = 'block';
    } else {
        noMaterialsDiv.style.display = 'none';
    }
}

// Funções para ações dos materiais
function downloadMaterial(materialId) {
    alert(`Iniciando download do material ${materialId}...`);
    // Aqui seria implementado o download real
    console.log(`Download material ${materialId}`);
}

function viewMaterial(materialId) {
    alert(`Abrindo visualização do material ${materialId}...`);
    // Aqui seria implementada a visualização real
    console.log(`View material ${materialId}`);
}

function playVideo(materialId) {
    alert(`Reproduzindo vídeo ${materialId}...`);
    // Aqui seria implementado o player de vídeo
    console.log(`Play video ${materialId}`);
}

function openLink(materialId) {
    alert(`Abrindo link externo do material ${materialId}...`);
    // Aqui seria aberto o link real
    console.log(`Open link ${materialId}`);
}

function shareMaterial(materialId) {
    alert(`Compartilhando material ${materialId}...`);
    // Aqui seria implementado o compartilhamento
    console.log(`Share material ${materialId}`);
}

function copyLink(materialId) {
    // Simular cópia do link
    navigator.clipboard.writeText(`https://studyapp.com/material/${materialId}`).then(() => {
        alert('Link copiado para a área de transferência!');
    }).catch(() => {
        alert('Link copiado: https://studyapp.com/material/' + materialId);
    });
}

function showMaterialOptions(materialId) {
    const options = [
        'Editar informações',
        'Mover para outro grupo',
        'Marcar como favorito',
        'Reportar problema',
        'Excluir material'
    ];
    
    const choice = prompt(`Opções para o material ${materialId}:\n\n` + 
        options.map((opt, i) => `${i + 1}. ${opt}`).join('\n') + 
        '\n\nDigite o número da opção desejada:');
    
    if (choice && choice >= 1 && choice <= options.length) {
        alert(`Executando: ${options[choice - 1]}`);
        console.log(`Material ${materialId}: ${options[choice - 1]}`);
    }
}

// Funções do modal de adicionar material
function openMaterialModal() {
    document.getElementById('material-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeMaterialModal() {
    document.getElementById('material-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Limpar formulário
    document.getElementById('add-material-form').reset();
    toggleUploadFields(); // Reset dos campos de upload
}

function toggleUploadFields() {
    const materialType = document.getElementById('material-type').value;
    const fileUploadGroup = document.getElementById('file-upload-group');
    const linkInputGroup = document.getElementById('link-input-group');
    
    if (materialType === 'link') {
        fileUploadGroup.style.display = 'none';
        linkInputGroup.style.display = 'block';
        document.getElementById('material-file').removeAttribute('required');
        document.getElementById('material-link').setAttribute('required', 'required');
    } else {
        fileUploadGroup.style.display = 'block';
        linkInputGroup.style.display = 'none';
        document.getElementById('material-link').removeAttribute('required');
        if (materialType) {
            document.getElementById('material-file').setAttribute('required', 'required');
        }
    }
}

// Funções para upload de arquivo
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#007bff';
    e.currentTarget.style.background = '#f8f9ff';
}

function handleFileDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('material-file').files = files;
        updateFileUploadDisplay(files[0]);
    }
    
    // Reset visual
    e.currentTarget.style.borderColor = '#dee2e6';
    e.currentTarget.style.background = 'transparent';
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        updateFileUploadDisplay(file);
    }
}

function updateFileUploadDisplay(file) {
    const uploadText = document.querySelector('.file-upload-text');
    uploadText.innerHTML = `
        <i class="fas fa-check-circle" style="color: #28a745;"></i>
        <p><strong>${file.name}</strong></p>
        <span>Tamanho: ${(file.size / 1024 / 1024).toFixed(2)} MB</span>
    `;
}

// Event listener para o formulário de adicionar material
document.addEventListener('DOMContentLoaded', () => {
    const addMaterialForm = document.getElementById('add-material-form');
    if (addMaterialForm) {
        addMaterialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(addMaterialForm);
            const materialData = {
                name: formData.get('name'),
                group: formData.get('group'),
                type: formData.get('type'),
                description: formData.get('description'),
                file: formData.get('file'),
                link: formData.get('link')
            };
            
            console.log('Dados do material:', materialData);
            
            // Simular envio
            alert('Material adicionado com sucesso!');
            closeMaterialModal();
            
            // Aqui seria feita a requisição para o backend
            // addMaterialToServer(materialData);
        });
    }
});

// Fechar modal ao clicar fora dele
document.addEventListener('click', (e) => {
    const modal = document.getElementById('material-modal');
    if (e.target === modal) {
        closeMaterialModal();
    }
});

// Funcionalidades da página de Amigos
function searchFriends() {
    const searchTerm = document.getElementById('friend-search').value.toLowerCase().trim();
    const searchResults = document.getElementById('search-results');
    const searchUserList = document.getElementById('search-user-list');
    
    if (searchTerm.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    // Simular dados de usuários encontrados
    const mockUsers = [
        {
            id: 301,
            name: 'Julia Rodrigues',
            course: 'Engenharia de Software - 4º Semestre',
            email: 'julia.rodrigues@unisanta.br',
            avatar: 'https://ui-avatars.com/api/?name=Julia+Rodrigues&background=e3f2fd&color=1976d2&size=60',
            mutualFriends: 3,
            status: 'online'
        },
        {
            id: 302,
            name: 'Roberto Santos',
            course: 'Ciência da Computação - 6º Semestre',
            email: 'roberto.santos@unisanta.br',
            avatar: 'https://ui-avatars.com/api/?name=Roberto+Santos&background=e8f5e8&color=2e7d32&size=60',
            mutualFriends: 1,
            status: 'offline'
        },
        {
            id: 303,
            name: 'Amanda Costa',
            course: 'Sistemas de Informação - 3º Semestre',
            email: 'amanda.costa@unisanta.br',
            avatar: 'https://ui-avatars.com/api/?name=Amanda+Costa&background=fff3e0&color=f57c00&size=60',
            mutualFriends: 7,
            status: 'online'
        }
    ];
    
    // Filtrar usuários baseado no termo de busca
    const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm)
    );
    
    // Renderizar resultados
    searchUserList.innerHTML = '';
    
    if (filteredUsers.length === 0) {
        searchUserList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Nenhum usuário encontrado para "${searchTerm}"</p>
            </div>
        `;
    } else {
        filteredUsers.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'friend-request';
            userElement.innerHTML = `
                <div class="user-avatar">
                    <img src="${user.avatar}" alt="${user.name}">
                    <div class="online-status ${user.status}"></div>
                </div>
                <div class="user-info">
                    <h3 class="user-name">${user.name}</h3>
                    <p class="user-course">${user.course}</p>
                    <p class="user-email">${user.email}</p>
                    <div class="mutual-friends">
                        <i class="fas fa-users"></i>
                        <span>${user.mutualFriends} amigos em comum</span>
                    </div>
                </div>
                <div class="request-actions">
                    <button class="accept-btn" onclick="sendFriendRequest(${user.id})">
                        <i class="fas fa-user-plus"></i>
                        Adicionar
                    </button>
                </div>
            `;
            searchUserList.appendChild(userElement);
        });
    }
    
    searchResults.style.display = 'block';
}

function sendFriendRequest(userId) {
    alert(`Solicitação de amizade enviada para o usuário ${userId}!`);
    console.log(`Friend request sent to user ${userId}`);
    
    // Remover usuário dos resultados de busca após enviar solicitação
    const userElement = document.querySelector(`[data-user-id="${userId}"]`);
    if (userElement) {
        userElement.remove();
    }
}

function acceptFriendRequest(userId) {
    const requestElement = document.querySelector(`[data-user-id="${userId}"]`);
    if (requestElement) {
        const userName = requestElement.querySelector('.user-name').textContent;
        alert(`Você aceitou a solicitação de amizade de ${userName}!`);
        
        // Remover da lista de solicitações
        requestElement.remove();
        
        // Atualizar contador
        updateRequestCount();
        updateFriendsCount();
        
        console.log(`Friend request accepted from user ${userId}`);
    }
}

function declineFriendRequest(userId) {
    const requestElement = document.querySelector(`[data-user-id="${userId}"]`);
    if (requestElement) {
        const userName = requestElement.querySelector('.user-name').textContent;
        
        if (confirm(`Tem certeza que deseja recusar a solicitação de ${userName}?`)) {
            alert(`Solicitação de ${userName} foi recusada.`);
            
            // Remover da lista de solicitações
            requestElement.remove();
            
            // Atualizar contador
            updateRequestCount();
            
            console.log(`Friend request declined from user ${userId}`);
        }
    }
}

function updateRequestCount() {
    const requests = document.querySelectorAll('.friend-request');
    const countElement = document.querySelector('.request-count');
    if (countElement) {
        countElement.textContent = requests.length;
    }
}

function updateFriendsCount() {
    const friends = document.querySelectorAll('.friend-card');
    const countElement = document.querySelector('.friends-count');
    if (countElement) {
        countElement.textContent = friends.length;
    }
}

function toggleFriendsView(viewType) {
    const friendsGrid = document.getElementById('friends-grid');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Atualizar botões ativos
    viewButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-view="${viewType}"]`).classList.add('active');
    
    // Alternar classe do grid
    if (viewType === 'list') {
        friendsGrid.classList.add('list-view');
    } else {
        friendsGrid.classList.remove('list-view');
    }
}

function sortFriends(sortBy) {
    const friendsGrid = document.getElementById('friends-grid');
    const friendCards = Array.from(friendsGrid.querySelectorAll('.friend-card'));
    
    friendCards.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                const nameA = a.querySelector('.friend-name').textContent;
                const nameB = b.querySelector('.friend-name').textContent;
                return nameA.localeCompare(nameB);
                
            case 'course':
                const courseA = a.querySelector('.friend-course').textContent;
                const courseB = b.querySelector('.friend-course').textContent;
                return courseA.localeCompare(courseB);
                
            case 'recent':
                // Simular ordenação por data de amizade (mais recentes primeiro)
                const dateA = a.querySelector('.stat:last-child').textContent;
                const dateB = b.querySelector('.stat:last-child').textContent;
                return dateB.localeCompare(dateA);
                
            case 'online':
                const statusA = a.getAttribute('data-status');
                const statusB = b.getAttribute('data-status');
                if (statusA === 'online' && statusB === 'offline') return -1;
                if (statusA === 'offline' && statusB === 'online') return 1;
                return 0;
                
            default:
                return 0;
        }
    });
    
    // Reordenar elementos no DOM
    friendCards.forEach(card => friendsGrid.appendChild(card));
}

function sendMessage(friendId) {
    alert(`Abrindo conversa com o amigo ${friendId}...`);
    console.log(`Opening chat with friend ${friendId}`);
    // Aqui seria implementado o sistema de mensagens
}

function viewProfile(friendId) {
    alert(`Visualizando perfil do amigo ${friendId}...`);
    console.log(`Viewing profile of friend ${friendId}`);
    // Aqui seria implementada a visualização do perfil
}

function showFriendOptions(friendId) {
    const options = [
        'Ver perfil completo',
        'Enviar mensagem',
        'Adicionar aos favoritos',
        'Silenciar notificações',
        'Remover da lista de amigos'
    ];
    
    const choice = prompt(`Opções para o amigo ${friendId}:\n\n` + 
        options.map((opt, i) => `${i + 1}. ${opt}`).join('\n') + 
        '\n\nDigite o número da opção desejada:');
    
    if (choice && choice >= 1 && choice <= options.length) {
        if (choice == 5) {
            // Confirmar remoção
            if (confirm('Tem certeza que deseja remover este amigo da sua lista?')) {
                const friendCard = document.querySelector(`[data-user-id="${friendId}"]`);
                if (friendCard) {
                    friendCard.remove();
                    updateFriendsCount();
                    alert('Amigo removido da sua lista.');
                }
            }
        } else {
            alert(`Executando: ${options[choice - 1]}`);
        }
        console.log(`Friend ${friendId}: ${options[choice - 1]}`);
    }
}

function focusSearch() {
    document.getElementById('friend-search').focus();
    document.querySelector('.search-section').scrollIntoView({ behavior: 'smooth' });
}

function closeConfirmationModal() {
    document.getElementById('confirmation-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners para a página de amigos
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar funcionalidades da página de amigos
    if (document.querySelector('.friends-container')) {
        // Event listener para busca em tempo real
        const searchInput = document.getElementById('friend-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                if (e.target.value.length === 0) {
                    document.getElementById('search-results').style.display = 'none';
                }
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchFriends();
                }
            });
        }
        
        // Inicializar contadores
        updateRequestCount();
        updateFriendsCount();
    }
});
