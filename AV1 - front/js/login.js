document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const clearBtn = document.getElementById('clearBtn');
  const message = document.getElementById('message');

  // Função para validar email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Função para mostrar mensagem
  const showMessage = (text, isError = true) => {
    message.textContent = text;
    message.style.color = isError ? 'red' : 'green';
  };

  // Evento de submit do formulário
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validações
    if (!email) {
      showMessage('Por favor, preencha o email');
      return;
    }

    if (!validateEmail(email)) {
      showMessage('Por favor, insira um email válido');
      return;
    }

    if (!password) {
      showMessage('Por favor, preencha a senha');
      return;
    }

    // Tenta fazer login
    if (auth.login(email, password)) {
      showMessage('Login realizado com sucesso!', false);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      showMessage('Email ou senha inválidos');
    }
  });

  // Evento do botão limpar
  clearBtn.addEventListener('click', () => {
    loginForm.reset();
    document.getElementById('email').focus();
    message.textContent = '';
  });
});
