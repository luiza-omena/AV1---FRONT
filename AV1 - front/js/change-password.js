document.addEventListener("DOMContentLoaded", () => {
  const changePasswordForm = document.getElementById("changePasswordForm");
  const clearBtn = document.getElementById("clearBtn");
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

  const findUser = (email) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find((user) => user.email === email);
  };

  const updateUser = (email, newPassword) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        return { ...u, password: newPassword };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  changePasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!email) {
      showMessage("Por favor, preencha o email");
      return;
    }

    if (!validateEmail(email)) {
      showMessage("Por favor, insira um email válido");
      return;
    }

    const user = findUser(email);
    if (!user) {
      showMessage("Email incorreto");
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

    updateUser(email, password);

    showMessage("Senha alterada com sucesso!", false);
    setTimeout(() => {
      window.history.back();
    }, 1000);
  });

  clearBtn.addEventListener("click", () => {
    changePasswordForm.reset();
    document.getElementById("email").focus();
    message.textContent = "";
  });

  const showMessage = (text, isError = true) => {
    message.textContent = text;
    message.style.color = isError ? "red" : "green";
  };
});
