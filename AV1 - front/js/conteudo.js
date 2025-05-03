document.addEventListener('DOMContentLoaded', () => {
  // Verifica se o usuário está logado e atualiza o menu
  const updateMenu = () => {
    const navList = document.querySelector('.nav-list');
    const servicesLink = document.querySelector('.nav-list li:first-child');

    if (auth.isLoggedIn()) {
      // Se o link de serviços não existe, adiciona
      if (!servicesLink || !servicesLink.querySelector('a[href="service.html"]')) {
        const newLi = document.createElement('li');
        newLi.innerHTML = '<a href="service.html">Serviços</a>';
        navList.insertBefore(newLi, navList.firstChild);
      }
    } else {
      // Se o link de serviços existe, remove
      if (servicesLink && servicesLink.querySelector('a[href="service.html"]')) {
        servicesLink.remove();
      }
    }
  };

  // Atualiza o menu quando a página carrega
  updateMenu();

  // Atualiza o menu quando o estado de login muda
  window.addEventListener('storage', (e) => {
    if (e.key === 'user') {
      updateMenu();
    }
  });
});
