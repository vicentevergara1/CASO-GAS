import { productImageSource } from "../data/productImages.js";

export default function ProductCard({ product, onAdd, onViewDetails, readOnly = false }) {
  const stock = product.stock === undefined || product.stock === null ? null : Number(product.stock);
  const canAdd = typeof onAdd === "function" && !readOnly;
  return (
    <article className="card h-100 product-card">
      <div className="product-card-art">
        <span className="product-card-category">{product.category}</span>
        {product.featured && <span className="product-featured">Destacado</span>}
        <img src={productImageSource(product.image)} alt={product.name} className="product-image" />
      </div>
      <div className="card-body d-flex flex-column">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-description flex-grow-1">{product.description}</p>
        <div className="product-card-stock">
          <span className={`stock-dot ${stock !== null && stock < 1 ? "out" : ""}`} />
          {stock === null ? "Stock por consultar" : stock < 1 ? "Sin stock disponible" : `${stock} unidades disponibles`}
        </div>
        <div className="product-card-footer">
          <div className="product-card-price-wrap">
            <span>Precio</span>
            <strong>${Number(product.price).toLocaleString("es-CL")}</strong>
          </div>
          <div className="product-card-actions">
            {canAdd && <button className="btn btn-primary" disabled={stock !== null && stock < 1} onClick={() => onAdd(product)} aria-label={`Agregar ${product.name} al carrito`}>+ Agregar</button>}
            <button type="button" className="btn btn-outline-primary" onClick={() => onViewDetails?.(product)}>Ver detalle</button>
          </div>
        </div>
      </div>
    </article>
  );
}
