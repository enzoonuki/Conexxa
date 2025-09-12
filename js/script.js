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

            alert('Login bem-sucedido! Redirecionando para a página principal.');
            
            // Pseudocódigo para redirecionamento:
            // window.location.href = '/dashboard.html'; 
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
