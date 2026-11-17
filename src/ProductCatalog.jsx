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
    <section id="productos" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-end mb-4">
          <div className="col-lg-7">
            <span className="text-primary fw-semibold">CATÁLOGO</span>
            <h2 className="display-6 fw-bold">Productos para tu hogar y negocio</h2>
          </div>
          <div className="col-lg-5 mt-3">
            <label className="visually-hidden" htmlFor="product-search">Buscar productos</label>
            <input id="product-search" className="form-control" placeholder="Buscar producto…" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </div>
        <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtrar productos por categoría">
          {availableCategories.map((item) => (
            <button key={item} type="button" className={`btn ${category === item ? "btn-primary" : "btn-outline-primary"}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <div className="row g-4">
          {filtered.map((product) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <ProductCard product={product} onAdd={onAdd} readOnly={readOnly} onViewDetails={showDetails} />
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="alert alert-warning mt-4">No encontramos productos para tu búsqueda.</div>}
      </div>
      {selectedProduct && <ProductDetails product={selectedProduct} loading={detailsLoading} error={detailsError} onClose={() => setSelectedProduct(null)} onAdd={(item) => { onAdd?.(item); setSelectedProduct(null); }} readOnly={readOnly} />}
    </section>
  );
}
