import { productImageSource } from "../../../data/productImages.js";
import { formatCLP } from "../../../services/format.js";
import Icon from "../../../shared/components/Icon.jsx";

export default function AdminProductList({
  products,
  items,
  filter,
  onFilterChange,
  onClearFilter,
  onEdit,
  onRemove,
}) {
  return (
    <section className="card admin-card admin-list-card" aria-labelledby="admin-list-title">
      <div className="card-body">
        <div className="admin-list-toolbar">
          <div>
            <span className="section-eyebrow">Catálogo</span>
            <h2 id="admin-list-title">Productos ({products.length})</h2>
          </div>
          <div className="admin-list-search">
            <label htmlFor="admin-list-filter" className="visually-hidden">
              Buscar productos para administrar
            </label>
            <div className="input-with-icon">
              <Icon name="search" />
              <input
                id="admin-list-filter"
                type="search"
                className="form-control"
                placeholder="Buscar producto..."
                value={filter}
                onChange={(event) => onFilterChange(event.target.value)}
              />
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="admin-empty">
            <Icon name="search" size={26} />
            <p>{filter ? "No hay productos que coincidan con la búsqueda." : "No hay productos en el catálogo."}</p>
            {filter && (
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={onClearFilter}>
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <div className="admin-list">
            {items.map((product) => (
              <article key={product.id} className="admin-list-item">
                <img src={productImageSource(product.image)} alt="" />
                <div className="admin-list-info">
                  <strong>{product.name}</strong>
                  <span>{product.category} · {formatCLP(product.price)}</span>
                  {product.featured && <span className="badge text-bg-info align-self-start mt-1">Destacado</span>}
                </div>
                <div className="admin-list-actions">
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => onEdit(product)}>
                    <Icon name="edit" size={16} />
                    Editar
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onRemove(product)}>
                    <Icon name="trash" size={16} />
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
