document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const clearBtn = document.getElementById("clearBtn");
  const message = document.getElementById("message");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const findUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find(
      (user) => user.email === email && user.password === password
    );
  };

  const showMessage = (text, isError = true) => {
    message.textContent = text;
    message.style.color = isError ? "red" : "green";
  };

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email) {
      showMessage("Por favor, preencha o email");
      return;
    }

    if (!validateEmail(email)) {
      showMessage("Por favor, insira um email válido");
      return;
    }

    if (!password) {
      showMessage("Por favor, preencha a senha");
      return;
    }

    const user = findUser(email, password);

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      showMessage("Login realizado com sucesso!", false);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      showMessage("Email ou senha inválidos");
    }
  });

  clearBtn.addEventListener("click", () => {
    loginForm.reset();
    document.getElementById("email").focus();
    message.textContent = "";
  });
});
