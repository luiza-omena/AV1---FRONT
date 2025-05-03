document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('main');
  const user = auth.getCurrentUser();

  // Se o usuário não estiver logado, mostra mensagem
  if (!auth.isLoggedIn()) {
    mainContent.innerHTML = `
      <div class="login-container">
        <h2>Acesso Restrito</h2>
        <div class="message error">
          <p>Você precisa estar logado para acessar esta página.</p>
          <div class="button-group">
            <a href="login.html" class="button">Fazer Login</a>
            <a href="register.html" class="button">Cadastrar-se</a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Se o usuário estiver logado, mostra o conteúdo normal
  const serviceForm = document.getElementById('serviceForm');
  const ordersTable = document.getElementById('ordersTable');
  const priceLabel = document.getElementById('price');
  const deadlineLabel = document.getElementById('deadline');
  const expectedDateLabel = document.getElementById('expectedDate');
  const statusLabel = document.getElementById('status');

  // Atualiza informações do usuário
  document.querySelector('.user-info p:nth-child(1)').textContent = `Nome: ${user.name}`;
  document.querySelector('.user-info p:nth-child(2)').textContent = `Email (login): ${user.email}`;

  // Preços e prazos dos serviços
  const servicePrices = {
    'Desenvolvimento de Software': 5000,
    'Consultoria de Segurança': 3500,
    'Gerenciamento de Rede': 2500,
    'Suporte Técnico': 1500
  };

  const serviceDeadlines = {
    'Desenvolvimento de Software': 10,
    'Consultoria de Segurança': 7,
    'Gerenciamento de Rede': 5,
    'Suporte Técnico': 3
  };

  // Função para formatar data
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Função para calcular data prevista
  const calculateExpectedDate = (deadline) => {
    const date = new Date();
    date.setDate(date.getDate() + deadline);
    return formatDate(date);
  };

  // Função para formatar preço
  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  // Atualiza informações quando um serviço é selecionado
  document.getElementById('service').addEventListener('change', (e) => {
    const service = e.target.value;
    if (service) {
      const price = servicePrices[service];
      const deadline = serviceDeadlines[service];
      const expectedDate = calculateExpectedDate(deadline);

      priceLabel.textContent = formatPrice(price);
      deadlineLabel.textContent = `${deadline} dias`;
      expectedDateLabel.textContent = expectedDate;
    } else {
      priceLabel.textContent = '-';
      deadlineLabel.textContent = '-';
      expectedDateLabel.textContent = '-';
    }
  });

  // Função para adicionar nova solicitação
  const addOrder = (service, price, expectedDate) => {
    const tbody = ordersTable.querySelector('tbody');
    const newRow = document.createElement('tr');
    const orderNumber = (tbody.children.length + 1).toString().padStart(3, '0');
    const today = formatDate(new Date());

    newRow.innerHTML = `
      <td>${today}</td>
      <td>${orderNumber}</td>
      <td>${service}</td>
      <td>Em Andamento</td>
      <td>${formatPrice(price)}</td>
      <td>${expectedDate}</td>
      <td><button class="delete-btn">Excluir</button></td>
    `;

    tbody.appendChild(newRow);
  };

  // Evento de submit do formulário
  serviceForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const service = document.getElementById('service').value;
    if (!service) {
      alert('Por favor, selecione um serviço');
      return;
    }

    const price = servicePrices[service];
    const expectedDate = expectedDateLabel.textContent;

    addOrder(service, price, expectedDate);
    serviceForm.reset();
    priceLabel.textContent = '-';
    deadlineLabel.textContent = '-';
    expectedDateLabel.textContent = '-';
  });

  // Evento para excluir solicitação
  ordersTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      if (confirm('Tem certeza que deseja excluir esta solicitação?')) {
        e.target.closest('tr').remove();
      }
    }
  });
});
