// Genera las tarjetas de producto (mismo diseño en index.html y pages/productos.html)
// a partir del catálogo único definido en products-data.js.

(function () {
  const SITE_BASE = location.pathname.includes("/pages/") ? "../" : "";

  function money(n) {
    return "$" + n.toLocaleString("es-CL");
  }

  function productCardHTML(p) {
    const img = `${SITE_BASE}assets/images/${p.image}`;
    return `
      <div
        id="product-${p.id}"
        class="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-200/80 flex flex-col justify-between group"
        data-search-name="${p.name}"
      >
        <div>
          <span class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            ${p.category}
          </span>
          <div class="h-44 flex items-center justify-center p-2 mb-4">
            <img
              src="${img}"
              alt="${p.name}"
              class="max-h-full object-contain group-hover:scale-105 transition-transform"
              loading="lazy"
            />
          </div>
          <h3 class="font-semibold text-slate-900 text-lg">${p.name}</h3>
          <p class="text-sm text-slate-500 mt-1">${p.description}</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xl font-bold text-slate-900">${money(p.price)}</span>
          <button
            class="bg-fg-brand hover:opacity-90 text-white p-2.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Agregar ${p.name} al carrito"
            data-id="${p.id}"
            data-name="${p.name}"
            data-price="${p.price}"
            onclick="addToCart(this)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>`;
  }

  function renderFeatured() {
    const container = document.getElementById("featured-products");
    if (!container) return;
    const featured = PRODUCTS.filter((p) => p.featured);
    container.innerHTML = featured.map(productCardHTML).join("");
  }

  function renderCatalog() {
    const categories = ["Cilindros", "Mangueras", "Reguladores", "Accesorios"];
    categories.forEach((cat) => {
      const anchor = PRODUCTS.find((p) => p.category === cat)?.categoryAnchor;
      const grid = document.getElementById(`${anchor}-grid`);
      if (!grid) return;
      const items = PRODUCTS.filter((p) => p.category === cat);
      grid.innerHTML = items.map(productCardHTML).join("");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderFeatured();
    renderCatalog();
  });
})();
