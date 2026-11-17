import {productImageSource} from "../data/productImages.js";

export default function ProductCard({ product, onAdd, onViewDetails, readOnly = false }) {
  const stock = product.stock === undefined || product.stock === null ? null : Number(product.stock);
  const canAdd = typeof onAdd === "function" && !readOnly;
  return (
    <article className="card h-100 shadow-sm border-0 product-card">
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-light align-self-start mb-2">{product.category}</span>
        <div className="d-flex align-items-center justify-content-center mb-3" style={{ height: 180 }}>
          <img src={productImageSource(product.image)} alt={product.name} className="img-fluid product-image" />
        </div>
        <h3 className="h5">{product.name}</h3>
        <p className="small text-secondary flex-grow-1">{product.description}</p>
        <div className="small text-secondary mb-2">{stock === null ? "Stock por consultar" : `Stock disponible: ${stock}`}</div>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 border-top pt-3">
          <strong>${Number(product.price).toLocaleString("es-CL")}</strong>
          <div className="d-flex gap-2">
            {canAdd && <button className="btn btn-primary" disabled={stock !== null && stock < 1} onClick={() => onAdd(product)} aria-label={`Agregar ${product.name} al carrito`}>+ Agregar</button>}
            <button type="button" className="btn btn-outline-primary" onClick={() => onViewDetails?.(product)}>Ver detalle</button>
          </div>
        </div>
      </div>
    </article>
  );
}
