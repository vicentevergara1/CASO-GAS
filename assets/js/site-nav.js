// site-nav.js
// Lógica compartida por TODAS las páginas: menú móvil responsive + buscador.
//
// Buscador:
// - En productos.html (window.IS_PRODUCTS_PAGE = true) filtra las tarjetas
//   [data-name] en vivo y sincroniza el término con la URL (?q=...).
// - En el resto de páginas, al buscar redirige a productos.html?q=término.

(function () {
  // --- Menú móvil (hamburguesa) ---
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  // --- Buscador ---
  const searchForms = document.querySelectorAll("[data-search-form]");
  const searchInputs = document.querySelectorAll("[data-search-input]");
  const productsUrl = window.PRODUCTS_URL || "productos.html";

  function filterProducts(term) {
    const normalized = term.trim().toLowerCase();
    const cards = document.querySelectorAll("[data-name]");
    let visibleCount = 0;

    cards.forEach((card) => {
      const name = card.getAttribute("data-name").toLowerCase();
      const matches = name.includes(normalized);
      card.style.display = matches ? "" : "none";
      if (matches) visibleCount += 1;
    });

    const emptyState = document.getElementById("search-empty-state");
    if (emptyState) {
      emptyState.classList.toggle("hidden", visibleCount !== 0);
    }
  }

  function syncSearchInputs(term, exceptInput) {
    searchInputs.forEach((input) => {
      if (input !== exceptInput) input.value = term;
    });
  }

  function goToProductsSearch(term) {
    const url = new URL(productsUrl, window.location.href);
    if (term.trim()) {
      url.searchParams.set("q", term.trim());
    }
    window.location.href = url.pathname + url.search;
  }

  searchForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("[data-search-input]");
      const term = input ? input.value : "";

      if (window.IS_PRODUCTS_PAGE) {
        filterProducts(term);
      } else {
        goToProductsSearch(term);
      }
    });
  });

  if (window.IS_PRODUCTS_PAGE) {
    // Filtrado en vivo mientras se escribe.
    searchInputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        const term = e.target.value;
        syncSearchInputs(term, e.target);
        filterProducts(term);
      });
    });

    // Si llegamos desde otra página con ?q=..., precargar el término.
    const params = new URLSearchParams(window.location.search);
    const initialTerm = params.get("q") || "";
    if (initialTerm) {
      syncSearchInputs(initialTerm, null);
      filterProducts(initialTerm);
    }
  }
})();
