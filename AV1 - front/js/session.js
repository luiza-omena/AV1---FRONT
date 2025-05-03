document.addEventListener("DOMContentLoaded", () => {
  const navList = document.querySelector(".nav-list");

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (loggedUser) {
    navList.innerHTML = "";

    const servicesLi = document.createElement("li");
    servicesLi.innerHTML = `<a href="service.html">Serviços</a>`;
    navList.appendChild(servicesLi);

    const logoutLi = document.createElement("li");
    logoutLi.innerHTML = `<a href="#" id="logoutBtn">Sair</a>`;
    navList.appendChild(logoutLi);

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedUser");
      location.reload();
    });
  } else {
    window.location.href = "login.html";
  }
});
