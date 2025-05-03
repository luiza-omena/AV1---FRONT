document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const clearBtn = document.getElementById('clearBtn');
  const backBtn = document.getElementById('backBtn');
  const message = document.getElementById('message');

  // Função para validar email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Função para validar senha
  const validatePassword = (password) => {
    const minLength = 6;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[@#$%&*!?/\\|_+\-=.]/.test(password);
    const hasInvalidChar = /[{}[\]`~^:;<>,"']/.test(password);

    if (password.length < minLength) return 'A senha deve ter pelo menos 6 caracteres';
    if (!hasNumber) return 'A senha deve conter pelo menos 1 número';
    if (!hasUpperCase) return 'A senha deve conter pelo menos 1 letra maiúscula';
    if (!hasSpecialChar) return 'A senha deve conter pelo menos 1 caractere especial permitido';
    if (hasInvalidChar) return 'A senha contém caracteres não permitidos';
    return null;
  };

  // Função para validar nome
  const validateName = (name) => {
    const words = name.trim().split(/\s+/);
    if (words.length < 2) return 'O nome deve conter pelo menos duas palavras';
    if (words[0].length < 2) return 'A primeira palavra deve ter pelo menos 2 caracteres';
    if (/[{}[\]`~^:;<>,"']/.test(name)) return 'O nome não pode conter caracteres especiais';
    return null;
  };

  // Função para validar CPF
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) return 'CPF deve ter 11 dígitos';

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return 'CPF inválido';

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return 'CPF inválido';

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return 'CPF inválido';

    return null;
  };

  // Função para validar data de nascimento
  const validateBirthdate = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age < 18) return 'Você deve ter pelo menos 18 anos';
    return null;
  };

  // Função para validar telefone
  const validatePhone = (phone) => {
    if (!phone) return null; // Telefone é opcional

    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(phone)) return 'Formato de telefone inválido';
    return null;
  };

  // Função para formatar CPF
  const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para formatar telefone
  const formatPhone = (phone) => {
    phone = phone.replace(/\D/g, '');
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  // Evento de input para formatar CPF
  document.getElementById('cpf').addEventListener('input', (e) => {
    e.target.value = formatCPF(e.target.value);
  });

  // Evento de input para formatar telefone
  document.getElementById('phone').addEventListener('input', (e) => {
    e.target.value = formatPhone(e.target.value);
  });

  // Evento de submit do formulário
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message.textContent = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const birthdate = document.getElementById('birthdate').value;
    const phone = document.getElementById('phone').value;

    // Validações
    if (!email) {
      showMessage('Por favor, preencha o email');
      return;
    }

    if (!validateEmail(email)) {
      showMessage('Por favor, insira um email válido');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      showMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      showMessage('As senhas não coincidem');
      return;
    }

    const nameError = validateName(name);
    if (nameError) {
      showMessage(nameError);
      return;
    }

    const cpfError = validateCPF(cpf);
    if (cpfError) {
      showMessage(cpfError);
      return;
    }

    const birthdateError = validateBirthdate(birthdate);
    if (birthdateError) {
      showMessage(birthdateError);
      return;
    }

    const phoneError = validatePhone(phone);
    if (phoneError) {
      showMessage(phoneError);
      return;
    }

    showMessage('Cadastro realizado com sucesso!', false);
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1000);
  });

  // Evento do botão limpar
  clearBtn.addEventListener('click', () => {
    registerForm.reset();
    document.getElementById('email').focus();
    message.textContent = '';
  });

  // Evento do botão voltar
  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  // Função para mostrar mensagem
  const showMessage = (text, isError = true) => {
    message.textContent = text;
    message.style.color = isError ? 'red' : 'green';
  };
});
