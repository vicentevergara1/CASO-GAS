import { useEffect, useMemo, useState } from "react";

const formatCLP = (amount) => `$${amount.toLocaleString("es-CL")}`;

const normalizeText = (text) =>
    String(text ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

function SearchResultCard({ product, onAdd }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <article className="search-product-card" aria-label={product.name}>
            <div className="search-product-image">
                <img
                    src={`${import.meta.env.BASE_URL}assets/images/${product.image}`}
                    alt={product.name}
                    loading="lazy"
                />
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
                            −
                        </button>
                        <output aria-live="polite" aria-label={`Cantidad seleccionada: ${quantity}`}>
                            {quantity}
                        </output>
                        <button
                            type="button"
                            aria-label={`Añadir una unidad de ${product.name}`}
                            onClick={() => setQuantity((current) => current + 1)}
                        >
                            +
                        </button>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary search-add-button"
                        onClick={() => onAdd?.(product, quantity)}
                        aria-label={`Agregar ${quantity} ${product.name} al carrito`}
                    >
                        <span aria-hidden="true">🛒</span> Agregar
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function SearchModal({ products, query, setQuery, onAdd, onClose }) {
    const [category, setCategory] = useState("Todos");
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
            const matchingWords = searchTerm.split(/\s+/).every((word) =>
                productWords.some((productWord) => productWord.startsWith(word))
            );
            return matchingCategory && matchingWords;
        });
    }, [products, query, category]);

    useEffect(() => {
        function closeOnEscape(event) {
            if (event.key === "Escape") onClose();
        }
        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [onClose]);

    return (
        <div className="modal d-block search-modal" role="dialog" aria-modal="true" aria-labelledby="search-title">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl search-dialog">
                <div className="modal-content search-modal-content">
                    <header className="modal-header search-header">
                        <div>
                            <span className="search-eyebrow">TIENDA GAS EL VOLCÁN</span>
                            <h2 id="search-title" className="h4 mb-1 fw-bold">Busca y compra tus productos</h2>
                            <p className="text-secondary mb-0 small">Elige la cantidad y agrégala directamente al carrito.</p>
                        </div>
                        <button type="button" className="btn-close ms-2" onClick={onClose} aria-label="Cerrar búsqueda" />
                    </header>

                    <div className="search-toolbar">
                        <label htmlFor="search-product-input" className="form-label fw-semibold small mb-2">
                            ¿Qué producto estás buscando?
                        </label>
                        <div className="search-input-row">
                            <span className="search-input-icon" aria-hidden="true">⌕</span>
                            <input
                                id="search-product-input"
                                type="search"
                                autoFocus
                                className="form-control search-input"
                                placeholder="Ej: cilindro 15 kg, manguera, regulador..."
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
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
                                    className={`btn btn-sm ${category === item ? "btn-primary" : "btn-outline-secondary"}`}
                                    onClick={() => setCategory(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="modal-body search-results-area">
                        <div className="search-results-heading" role="status" aria-live="polite">
                            <h3 className="h6 fw-bold mb-0">{query.trim() ? "Resultados de tu búsqueda" : "Explora nuestros productos"}</h3>
                            <span className="text-secondary small">
                {results.length} producto{results.length === 1 ? "" : "s"}
              </span>
                        </div>

                        {results.length === 0 ? (
                            <div className="search-empty" role="status">
                                <span aria-hidden="true" className="search-empty-icon">🔎</span>
                                <h3 className="h5">Sin resultados.</h3>
                                <p className="text-secondary mb-3">Prueba con otro nombre o selecciona una categoría diferente.</p>
                                <button type="button" className="btn btn-outline-primary" onClick={() => { setQuery(""); setCategory("Todos"); }}>
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

                    <footer className="modal-footer search-footer">
                        <span className="small text-secondary">Al agregar un producto se abrirá tu carrito.</span>
                        <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Seguir viendo la tienda</button>
                    </footer>
                </div>
            </div>
        </div>
    );
}
