const SERVICES = {
  "Desenvolvimento de Software": { price: 5000, deadline: 10 },
  "Consultoria de Segurança": { price: 3500, deadline: 7 },
  "Gerenciamento de Rede": { price: 2800, deadline: 5 },
  "Suporte Técnico": { price: 1800, deadline: 3 },
};

function formatCurrency(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function calculateExpectedDate(days) {
  const today = new Date();
  today.setDate(today.getDate() + days);
  return today.toISOString().split("T")[0];
}

document.addEventListener("DOMContentLoaded", () => {
  const serviceSelect = document.getElementById("service");
  const priceEl = document.getElementById("price");
  const deadlineEl = document.getElementById("deadline");
  const expectedDateEl = document.getElementById("expectedDate");
  const ordersTable = document
    .getElementById("ordersTable")
    .querySelector("tbody");
  const form = document.getElementById("serviceForm");

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  let nextOrderNumber = orders.length + 1;

  function renderOrders() {
    ordersTable.innerHTML = "";
    orders.forEach((order, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
          <td>${order.number}</td>
          <td>${order.date}</td>
          <td>${order.service}</td>
          <td>${order.status}</td>
          <td>${formatCurrency(order.price)}</td>
          <td>${order.expectedDate}</td>
          <td><button class="delete-btn" data-index="${index}">Excluir</button></td>
        `;
      ordersTable.appendChild(tr);
    });
  }

  serviceSelect.addEventListener("change", () => {
    const selected = SERVICES[serviceSelect.value];
    if (selected) {
      priceEl.textContent = formatCurrency(selected.price);
      deadlineEl.textContent = `${selected.deadline} dias úteis`;
      expectedDateEl.textContent = calculateExpectedDate(selected.deadline);
    } else {
      priceEl.textContent =
        deadlineEl.textContent =
        expectedDateEl.textContent =
          "-";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedService = serviceSelect.value;
    if (!selectedService || !SERVICES[selectedService]) return;

    const { price, deadline } = SERVICES[selectedService];
    const expectedDate = calculateExpectedDate(deadline);
    const today = new Date().toISOString().split("T")[0];

    const order = {
      number: String(nextOrderNumber).padStart(3, "0"),
      service: selectedService,
      price,
      status: "Em Elaboração",
      expectedDate,
      date: today,
    };

    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    nextOrderNumber++;
    renderOrders();
    form.reset();
    priceEl.textContent =
      deadlineEl.textContent =
      expectedDateEl.textContent =
        "-";
  });

  ordersTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = +e.target.dataset.index;
      orders.splice(index, 1);
      localStorage.setItem("orders", JSON.stringify(orders));
      renderOrders();
    }
  });

  renderOrders();
});
