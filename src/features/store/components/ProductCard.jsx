import { productImageSource } from "../../../data/productImages.js";
import { formatCLP } from "../../../services/format.js";
import Icon from "../../../shared/components/Icon.jsx";

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card h-100 product-card">
      <div className="product-card-media">
        <span className="badge product-category">{product.category}</span>
        {product.featured && <span className="badge product-featured">Destacado</span>}
        <img
          src={productImageSource(product.image)}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="card-body product-card-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-card-footer">
          <span className="product-price">
            <span className="visually-hidden">Precio: </span>
            {formatCLP(product.price)}
          </span>
          <button
            type="button"
            className="btn btn-primary product-add-button"
            onClick={() => onAdd(product)}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <Icon name="plus" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
