// Lógica del buscador (modal). Funciona sobre TODO el catálogo (PRODUCTS),
// no solo sobre los productos destacados de la página actual.

(function () {
  const SITE_BASE = location.pathname.includes("/pages/") ? "../" : "";
  const onProductsPage = location.pathname.includes("productos.html");

  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function money(n) {
    return "$" + n.toLocaleString("es-CL");
  }

  window.openSearch = function () {
    const modal = document.getElementById("search-modal");
    const input = document.getElementById("search-input");
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    setTimeout(() => input && input.focus(), 50);
    filterProducts();
  };

  window.closeSearch = function () {
    const modal = document.getElementById("search-modal");
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };

  window.handleSearchBackdrop = function (event) {
    if (event.target.id === "search-modal") closeSearch();
  };

  window.filterProducts = function () {
    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    const status = document.getElementById("search-status");
    const query = normalizeText(input.value.trim());

    const matches = PRODUCTS.filter((p) => {
      const name = normalizeText(p.name);
      return !query || name.includes(query);
    });

    results.innerHTML = matches
      .map((p) => {
        const img = `${SITE_BASE}assets/images/${p.image}`;
        return `
        <button type="button" onclick="goToProduct('${p.id}')" class="w-full flex items-center gap-4 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-left transition">
          <div class="w-14 h-14 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center p-2">
            <img src="${img}" alt="${p.name}" class="max-h-full max-w-full object-contain">
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-semibold text-slate-900 truncate">${p.name}</p>
            <p class="text-sm text-slate-500">${money(p.price)}</p>
          </div>
          <span class="text-fg-brand">→</span>
        </button>`;
      })
      .join("");

    if (!query) {
      status.textContent = "Escribe para buscar entre todos los productos.";
    } else if (matches.length) {
      status.textContent = `${matches.length} producto${matches.length === 1 ? "" : "s"} encontrado${matches.length === 1 ? "" : "s"}.`;
    } else {
      status.textContent = "No encontramos productos con ese nombre.";
      results.innerHTML = `<div class="py-8 text-center text-slate-500 text-sm">Prueba con otro término o revisa todo el catálogo.</div>`;
    }
  };

  window.goToProduct = function (id) {
    closeSearch();

    // Si el producto ya está en el DOM de esta página (ej. catálogo completo
    // en productos.html), simplemente hacemos scroll hasta él.
    const existing = document.getElementById(`product-${id}`);
    if (existing) {
      existing.scrollIntoView({ behavior: "smooth", block: "center" });
      existing.classList.add("ring-2", "ring-fg-brand");
      setTimeout(
        () => existing.classList.remove("ring-2", "ring-fg-brand"),
        1500,
      );
      return;
    }

    // Si no está en esta página (ej. buscaste algo no destacado desde el
    // index), navegamos al catálogo completo, a la categoría correspondiente.
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    const target = onProductsPage
      ? `#${product.categoryAnchor}`
      : `${SITE_BASE}pages/productos.html#${product.categoryAnchor}`;
    window.location.href = target;
  };
})();
