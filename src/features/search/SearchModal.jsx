import { useMemo, useState } from "react";
import { productImageSource } from "../../data/productImages.js";
import { formatCLP, normalizeText } from "../../services/format.js";
import Icon from "../../shared/components/Icon.jsx";
import useDialog from "../../shared/hooks/useDialog.js";

function SearchResultCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <article className="search-product-card" aria-label={product.name}>
      <div className="search-product-image">
        <img src={productImageSource(product.image)} alt={product.name} loading="lazy" />
      </div>

      <div className="search-product-info">
        <span className="search-product-category">{product.category}</span>
        <h3 className="search-product-title">{product.name}</h3>
        <p className="search-product-description">{product.description}</p>
        <strong className="search-product-price">{formatCLP(product.price)}</strong>

        <div className="search-product-actions">
          <div className="search-quantity" role="group" aria-label={`Cantidad de ${product.name}`}>
            <button
              type="button"
              aria-label={`Quitar una unidad de ${product.name}`}
              disabled={quantity === 1}
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              <Icon name="minus" size={16} />
            </button>
            <output aria-live="polite" aria-label={`Cantidad seleccionada: ${quantity}`}>
              {quantity}
            </output>
            <button
              type="button"
              aria-label={`Añadir una unidad de ${product.name}`}
              onClick={() => setQuantity((current) => current + 1)}
            >
              <Icon name="plus" size={16} />
            </button>
          </div>
          <button
            type="button"
            className="btn btn-primary search-add-button"
            onClick={() => onAdd?.(product, quantity)}
            aria-label={`Agregar ${quantity} ${product.name} al carrito`}
          >
            <Icon name="cart" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function SearchModal({ products, query, setQuery, onAdd, onClose }) {
  const [category, setCategory] = useState("Todos");
  const dialogRef = useDialog(onClose);

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const results = useMemo(() => {
    const searchTerm = normalizeText(query);
    return products.filter((product) => {
      const matchingCategory = category === "Todos" || product.category === category;
      const searchableText = normalizeText(
        `${product.name} ${product.category} ${product.description}`
      );
      const productWords = searchableText.split(/[^a-z0-9]+/).filter(Boolean);
      const matchingWords = !searchTerm || searchTerm.split(/\s+/).every((word) =>
        productWords.some((productWord) => productWord.startsWith(word))
      );
      return matchingCategory && matchingWords;
    });
  }, [products, query, category]);

  const resetFilters = () => {
    setQuery("");
    setCategory("Todos");
  };

  return (
    <div className="search-overlay">
      <div className="search-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        tabIndex={-1}
      >
        <header className="search-header">
          <div>
            <span className="search-eyebrow">Tienda Gas El Volcán</span>
            <h2 id="search-title">Busca y compra tus productos</h2>
            <p>Elige la cantidad y agrégala directamente al carrito.</p>
          </div>
          <button type="button" className="btn btn-icon btn-outline-secondary" onClick={onClose} aria-label="Cerrar búsqueda">
            <Icon name="close" size={20} />
          </button>
        </header>

        <div className="search-toolbar">
          <label htmlFor="search-product-input" className="form-label">
            ¿Qué producto estás buscando?
          </label>
          <div className="search-input-row">
            <span className="search-input-icon" aria-hidden="true">
              <Icon name="search" size={22} />
            </span>
            <input
              id="search-product-input"
              type="search"
              className="form-control search-input"
              placeholder="Ej: cilindro 15 kg, manguera, regulador..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              data-autofocus
            />
            {query && (
              <button type="button" className="btn btn-outline-secondary search-clear-button" onClick={() => setQuery("")}>
                Limpiar
              </button>
            )}
          </div>

          <div className="search-categories" role="group" aria-label="Filtrar por categoría">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                className={`filter-chip search-filter-chip ${category === item ? "is-active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="search-results-area">
          <div className="search-results-heading" role="status" aria-live="polite">
            <h3>{query.trim() ? "Resultados de tu búsqueda" : "Explora nuestros productos"}</h3>
            <span>
              {results.length} producto{results.length === 1 ? "" : "s"}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="search-empty" role="status">
              <span className="search-empty-icon" aria-hidden="true">
                <Icon name="search" size={30} />
              </span>
              <h3 className="h5">Sin resultados.</h3>
              <p>Prueba con otro nombre o selecciona una categoría diferente.</p>
              <button type="button" className="btn btn-outline-primary" onClick={resetFilters}>
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="search-results-grid">
              {results.map((product) => (
                <SearchResultCard key={product.id} product={product} onAdd={onAdd} />
              ))}
            </div>
          )}
        </div>

        <footer className="search-footer">
          <span>Al agregar un producto se abrirá tu carrito.</span>
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Seguir viendo la tienda
          </button>
        </footer>
      </div>
    </div>
  );
}
