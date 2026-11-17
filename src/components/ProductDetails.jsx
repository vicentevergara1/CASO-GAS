import { productImageSource } from "../data/productImages.js";

const formatCLP = (amount) => `$${Number(amount || 0).toLocaleString("es-CL")}`;

export default function ProductDetails({ product, onClose, onAdd, readOnly = false, loading = false, error = "" }) {
  if (!product) return null;

  return (
    <div className="product-details-overlay" onClick={onClose}>
      <section
        className="product-details-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="btn-close product-details-close" onClick={onClose} aria-label="Cerrar detalle" />
        <div className="product-details-image">
          <img src={productImageSource(product.image)} alt={product.name} />
        </div>
        <div className="product-details-content">
          {loading && <p role="status" className="small text-secondary">Consultando el detalle en el backend…</p>}
          {error && <div role="alert" className="alert alert-warning py-2">{error} Se muestran los datos del catálogo.</div>}
          <span className="badge text-bg-info mb-2">{product.category}</span>
          <h2 id="product-details-title" className="h3 fw-bold">{product.name}</h2>
          <p className="text-secondary">{product.description}</p>
          <p className="h4 fw-bold text-primary">{formatCLP(product.price)}</p>
          <p className="small text-secondary">Stock disponible: {Number(product.stock ?? 0)}</p>
          <div className="d-flex gap-2 flex-wrap">
            {!readOnly && (
              <button
                type="button"
                className="btn btn-primary"
                disabled={Number(product.stock ?? 0) < 1}
                onClick={() => onAdd?.(product)}
              >
                Agregar al carrito
              </button>
            )}
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </section>
    </div>
  );
}
