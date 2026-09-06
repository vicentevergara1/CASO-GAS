// Carrito persistente: se guarda en localStorage para que no se pierda
// al recargar la página o navegar entre secciones del sitio.
const CART_STORAGE_KEY = "elvolcan_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    // Si localStorage no está disponible, el carrito sigue funcionando
    // en memoria durante la sesión actual.
  }
}

let cart = loadCart();

function formatPrice(num) {
  return "$" + num.toLocaleString("es-CL");
}

// Convierte "18990", "18.990" o "18,990" a un número entero seguro
function parsePrice(raw) {
  const digitsOnly = String(raw).replace(/\D/g, "");
  return parseInt(digitsOnly, 10) || 0;
}

// Escapa texto para que no rompa el HTML si el nombre tuviera comillas, etc.
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function addToCart(button) {
  const id = button.dataset.id;
  const name = button.dataset.name;
  const price = parsePrice(button.dataset.price);

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }

  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find((item) => item.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    renderCart();
  }
}

function renderCart() {
  saveCart();

  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const badges = document.querySelectorAll(".cart-badge");

  // 1) Calcular el total PRIMERO, antes de tocar el DOM de las filas.
  //    Así el precio siempre queda correcto aunque algo falle al dibujar una fila.
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  if (totalEl) totalEl.textContent = formatPrice(total);

  badges.forEach((badge) => {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });

  // 2) Ahora sí, dibujar las filas.
  if (!container) return;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <p class="text-slate-400 text-sm text-center mt-10">Tu carrito está vacío</p>
    `;
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "flex items-center justify-between gap-3";

    row.innerHTML = `
      <div class="flex-1">
        <p class="text-sm font-medium text-slate-900">${escapeHtml(item.name)}</p>
        <p class="text-xs text-slate-500">${formatPrice(item.price)} c/u</p>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          data-action="decrease"
          data-id="${item.id}"
        >
          −
        </button>

        <span class="text-sm font-medium w-4 text-center">${item.qty}</span>

        <button
          class="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          data-action="increase"
          data-id="${item.id}"
        >
          +
        </button>

        <button
          class="ml-2 text-slate-400 hover:text-red-500 cursor-pointer"
          data-action="remove"
          data-id="${item.id}"
          aria-label="Eliminar ${escapeHtml(item.name)}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;

    container.appendChild(row);
  });
}

// Delegación de eventos: un solo listener en el contenedor,
// en vez de "onclick" escrito como texto en cada botón generado dinámicamente.
const cartItemsEl = document.getElementById("cart-items");
if (cartItemsEl) {
  cartItemsEl.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;

    if (action === "increase") changeQty(id, 1);
    if (action === "decrease") changeQty(id, -1);
    if (action === "remove") removeFromCart(id);
  });
}

function openCart() {
  document.getElementById("cart-drawer").classList.remove("translate-x-full");
  document.getElementById("cart-overlay").classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.add("translate-x-full");
  document.getElementById("cart-overlay").classList.add("hidden");
}

function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer.classList.contains("translate-x-full")) {
    openCart();
  } else {
    closeCart();
  }
}

// Pintar el estado guardado del carrito (badge, total, items) apenas carga la página.
renderCart();
