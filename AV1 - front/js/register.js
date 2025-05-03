document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const clearBtn = document.getElementById("clearBtn");
  const backBtn = document.getElementById("backBtn");
  const message = document.getElementById("message");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[@#$%&*!?/\\|_+\-=.]/.test(password);
    const hasInvalidChar = /[{}[\]`~^:;<>,"']/.test(password);

    if (password.length < minLength)
      return "A senha deve ter pelo menos 6 caracteres";
    if (!hasNumber) return "A senha deve conter pelo menos 1 número";
    if (!hasUpperCase)
      return "A senha deve conter pelo menos 1 letra maiúscula";
    if (!hasSpecialChar)
      return "A senha deve conter pelo menos 1 caractere especial permitido";
    if (hasInvalidChar) return "A senha contém caracteres não permitidos";
    return null;
  };

  const validateName = (name) => {
    const words = name.trim().split(/\s+/);
    if (words.length < 2) return "O nome deve conter pelo menos duas palavras";
    if (words[0].length < 2)
      return "A primeira palavra deve ter pelo menos 2 caracteres";
    if (/[{}[\]`~^:;<>,"']/.test(name))
      return "O nome não pode conter caracteres especiais";
    return null;
  };

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11) return "CPF deve ter 11 dígitos";

    if (/^(\d)\1{10}$/.test(cpf)) return "CPF inválido";

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return "CPF inválido";

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return "CPF inválido";

    return null;
  };

  const validateBirthdate = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    if (age < 18) return "Você deve ter pelo menos 18 anos";
    return null;
  };

  const validatePhone = (phone) => {
    if (!phone) return null;

    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(phone)) return "Formato de telefone inválido";
    return null;
  };

  const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (phone) => {
    phone = phone.replace(/\D/g, "");
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  document.getElementById("cpf").addEventListener("input", (e) => {
    e.target.value = formatCPF(e.target.value);
  });

  document.getElementById("phone").addEventListener("input", (e) => {
    e.target.value = formatPhone(e.target.value);
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.textContent = "";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const name = document.getElementById("name").value;
    const cpf = document.getElementById("cpf").value;
    const birthdate = document.getElementById("birthdate").value;
    const phone = document.getElementById("phone").value;

    if (!email) {
      showMessage("Por favor, preencha o email");
      return;
    }

    if (!validateEmail(email)) {
      showMessage("Por favor, insira um email válido");
      return;
    }

    const cpfError = validateCPF(cpf);
    if (cpfError) {
      showMessage(cpfError);
      return;
    }

    const existingUser = findUserByEmailOrCPF(email, cpf);
    if (existingUser) {
      showMessage("Já existe um usuário com esse email ou CPF.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      showMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      showMessage("As senhas não coincidem");
      return;
    }

    const nameError = validateName(name);
    if (nameError) {
      showMessage(nameError);
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

    insertUser({
      name,
      email,
      dateOfBirth: birthdate,
      name,
      cpf,
      phone,
      password,
    });

    showMessage("Cadastro realizado com sucesso!", false);
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });

  clearBtn.addEventListener("click", () => {
    registerForm.reset();
    document.getElementById("email").focus();
    message.textContent = "";
  });

  backBtn.addEventListener("click", () => {
    window.history.back();
  });

  const showMessage = (text, isError = true) => {
    message.textContent = text;
    message.style.color = isError ? "red" : "green";
  };

  const insertUser = (user) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const findUserByEmailOrCPF = (email, cpf) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    return users.find(
      (user) =>
        user.email === email ||
        user.cpf.replace(/[^\d]/g, "") === cpf.replace(/[^\d]/g, "")
    );
  };
});
