import { useMemo, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import Icon from "../../../shared/components/Icon.jsx";
import { normalizeText } from "../../../services/format.js";

export default function ProductCatalog({ products, onAdd }) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filtered = useMemo(() => {
    const search = normalizeText(query);
    return products.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesText = !search || normalizeText(
        `${product.name} ${product.category} ${product.description}`
      ).includes(search);
      return matchesCategory && matchesText;
    });
  }, [products, category, query]);

  const clearFilters = () => {
    setCategory("Todos");
    setQuery("");
  };

  return (
    <section id="productos" className="section catalog-section">
      <div className="container">
        <div className="section-heading catalog-heading">
          <div>
            <span className="section-eyebrow">Catálogo</span>
            <h2 className="section-title">Productos para tu hogar y negocio</h2>
            <p className="section-lead">
              Filtra por categoría o busca por nombre para encontrar lo que necesitas.
            </p>
          </div>

          <div className="catalog-search">
            <label htmlFor="product-search" className="form-label">
              Buscar en el catálogo
            </label>
            <div className="input-with-icon">
              <Icon name="search" />
              <input
                id="product-search"
                type="search"
                className="form-control"
                placeholder="Ej: cilindro 15 kg, manguera..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="catalog-toolbar">
          <div className="catalog-filters" role="group" aria-label="Filtrar catálogo por categoría">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-chip ${category === item ? "is-active" : ""}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="catalog-count" role="status" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="row g-3 g-lg-4">
            {filtered.map((product) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                <ProductCard product={product} onAdd={onAdd} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span className="empty-state-icon" aria-hidden="true">
              <Icon name="search" size={30} />
            </span>
            <h3>No encontramos productos</h3>
            <p>Prueba con otro nombre o revisa todas las categorías disponibles.</p>
            <button type="button" className="btn btn-outline-primary" onClick={clearFilters}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
