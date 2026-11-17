import { useMemo, useState } from "react";
import ProductCard from "./components/ProductCard.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import { apiRequest } from "./services/api.js";

export default function ProductCatalog({
  products = [],
  categories = [],
  onAdd,
  readOnly = false,
}) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const availableCategories = ["Todos", ...new Set([
    ...categories.map((item) => typeof item === "string" ? item : item.name),
    ...products.map((product) => product.category),
  ].filter(Boolean))];
  const filtered = useMemo(() => products.filter((product) =>
    (category === "Todos" || product.category === category) &&
    `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase())
  ), [products, category, query]);

  async function showDetails(product) {
    setSelectedProduct(product);
    setDetailsLoading(true);
    setDetailsError("");
    try {
      const details = await apiRequest(`/api/v1/products/${encodeURIComponent(product.id)}`, { auth: false });
      setSelectedProduct(details);
    } catch (reason) {
      setDetailsError(reason.message || "No se pudo cargar el detalle del producto.");
    } finally {
      setDetailsLoading(false);
    }
  }

  return (
    <section id="productos" className="catalog-section">
      <div className="container">
        <div className="catalog-heading">
          <div>
            <span className="section-eyebrow">CATÁLOGO DE PRODUCTOS</span>
            <h2>Encuentra lo que necesitas</h2>
            <p>Productos para tu hogar y negocio, en un solo lugar.</p>
          </div>
          <div className="catalog-search-wrap">
            <label className="visually-hidden" htmlFor="product-search">Buscar productos</label>
            <span className="catalog-search-icon" aria-hidden="true">⌕</span>
            <input id="product-search" className="form-control" placeholder="Buscar producto…" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </div>
        <div className="catalog-filters" role="group" aria-label="Filtrar productos por categoría">
          {availableCategories.map((item) => (
            <button key={item} type="button" className={`btn catalog-filter ${category === item ? "active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <div className="row g-4 catalog-grid">
          {filtered.map((product) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3 catalog-grid-item" key={product.id}>
              <ProductCard product={product} onAdd={onAdd} readOnly={readOnly} onViewDetails={showDetails} />
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="catalog-empty">No encontramos productos para tu búsqueda.</div>}
      </div>
      {selectedProduct && <ProductDetails product={selectedProduct} loading={detailsLoading} error={detailsError} onClose={() => setSelectedProduct(null)} onAdd={(item) => { onAdd?.(item); setSelectedProduct(null); }} readOnly={readOnly} />}
    </section>
  );
}
