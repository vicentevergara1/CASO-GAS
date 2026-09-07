// Lógica del buscador (modal). Busca sobre TODO el catálogo (PRODUCTS)
// y sobre las secciones de la página (SECTIONS), con filtro por tipo.

(function () {
  const SITE_BASE = location.pathname.includes("/pages/") ? "../" : "";
  const onProductsPage = location.pathname.includes("productos.html");
  const onIndexPage = !onProductsPage; // ajusta si agregas más páginas

  // Secciones "buscables" de la página principal (index.html).
  // Si agregas una sección nueva al index, solo agrégala aquí.
  const SECTIONS = [
    { anchor: "servicios", name: "Servicios" },
    { anchor: "nosotros", name: "Nosotros" },
    { anchor: "faq", name: "Preguntas frecuentes" },
    { anchor: "contacto", name: "Contacto" },
  ];

  let currentFilter = "all"; // "all" | "products" | "sections"

  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function money(n) {
    return "$" + n.toLocaleString("es-CL");
  }

  function updateTabStyles() {
    document.querySelectorAll(".search-tab").forEach((tab) => {
      const isActive = tab.dataset.filter === currentFilter;
      tab.classList.toggle("bg-fg-brand", isActive);
      tab.classList.toggle("text-white", isActive);
      tab.classList.toggle("bg-slate-100", !isActive);
      tab.classList.toggle("text-slate-600", !isActive);
      tab.classList.toggle("hover:bg-slate-200", !isActive);
    });
  }

  window.setSearchFilter = function (filter) {
    currentFilter = filter;
    updateTabStyles();
    filterProducts();
  };

  window.openSearch = function () {
    const modal = document.getElementById("search-modal");
    const input = document.getElementById("search-input");
    const navForm = document.getElementById("nav-search-form");
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    if (navForm) {
      navForm.classList.remove("border-gray-200");
      navForm.classList.add("border-fg-brand");
    }

    // Siempre reinicia a "Todos" al abrir, para que nadie pierda resultados
    // por haber dejado un filtro activo la vez anterior.
    currentFilter = "all";
    updateTabStyles();

    setTimeout(() => input && input.focus(), 50);
    filterProducts();
  };

  window.closeSearch = function () {
    const modal = document.getElementById("search-modal");
    const navForm = document.getElementById("nav-search-form");
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");

    if (navForm) {
      navForm.classList.remove("border-fg-brand");
      navForm.classList.add("border-gray-200");
    }
  };

  window.handleSearchBackdrop = function (event) {
    if (event.target.id === "search-modal") closeSearch();
  };

  function productResultHTML(p, showLabel) {
    const img = `${SITE_BASE}assets/images/${p.image}`;
    return `
      <button type="button" onclick="goToProduct('${p.id}')" class="group w-full flex items-center gap-3 sm:gap-4 p-3 rounded-xl border border-slate-200 hover:border-fg-brand hover:bg-slate-50 text-left transition-colors">
        <div class="w-14 h-14 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center p-2">
          <img src="${img}" alt="${p.name}" class="max-h-full max-w-full object-contain">
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-slate-900 group-hover:text-fg-brand truncate transition-colors">${p.name}</p>
          <p class="text-sm text-slate-500">${money(p.price)}</p>
        </div>
        ${showLabel ? `<span class="hidden sm:inline-block text-xs font-medium text-slate-400 bg-slate-100 rounded-full px-2 py-1 shrink-0">Producto</span>` : ""}
        <span class="hidden sm:inline text-fg-brand shrink-0">→</span>
      </button>`;
  }

  function sectionResultHTML(s, showLabel) {
    return `
      <button type="button" onclick="goToSection('${s.anchor}')" class="group w-full flex items-center gap-3 sm:gap-4 p-3 rounded-xl border border-slate-200 hover:border-fg-brand hover:bg-slate-50 text-left transition-colors">
        <div class="w-14 h-14 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center text-2xl">
          📄
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-slate-900 group-hover:text-fg-brand truncate transition-colors">${s.name}</p>
          <p class="text-sm text-slate-500 truncate">Ir a esta sección de la página</p>
        </div>
        ${showLabel ? `<span class="hidden sm:inline-block text-xs font-medium text-slate-400 bg-slate-100 rounded-full px-2 py-1 shrink-0">Página</span>` : ""}
        <span class="hidden sm:inline text-fg-brand shrink-0">→</span>
      </button>`;
  }

  window.filterProducts = function () {
    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    const status = document.getElementById("search-status");
    const query = normalizeText(input.value.trim());

    const showLabel = currentFilter === "all";

    const productMatches =
      currentFilter === "sections"
        ? []
        : PRODUCTS.filter(
            (p) => !query || normalizeText(p.name).includes(query),
          );

    const sectionMatches =
      currentFilter === "products"
        ? []
        : SECTIONS.filter(
            (s) => !query || normalizeText(s.name).includes(query),
          );

    const total = productMatches.length + sectionMatches.length;

    results.innerHTML =
      productMatches.map((p) => productResultHTML(p, showLabel)).join("") +
      sectionMatches.map((s) => sectionResultHTML(s, showLabel)).join("");

    if (!query) {
      status.textContent =
        "Escribe para buscar productos o secciones de la página.";
    } else if (total) {
      status.textContent = `${total} resultado${total === 1 ? "" : "s"} encontrado${total === 1 ? "" : "s"}.`;
    } else {
      status.textContent = "No encontramos resultados con ese término.";
      results.innerHTML = `<div class="py-8 text-center text-slate-500 text-sm">Prueba con otro término o cambia de filtro.</div>`;
    }
  };

  window.goToProduct = function (id) {
    closeSearch();

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

    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    const target = onProductsPage
      ? `#${product.categoryAnchor}`
      : `${SITE_BASE}pages/productos.html#${product.categoryAnchor}`;
    window.location.href = target;
  };

  window.goToSection = function (anchor) {
    closeSearch();

    if (onIndexPage) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Si estamos en otra página (ej. productos.html), navegamos al index
    // con el hash de la sección correspondiente.
    window.location.href = `${SITE_BASE}index.html#${anchor}`;
  };
})();
