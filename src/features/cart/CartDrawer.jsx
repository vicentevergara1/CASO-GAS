import useDialog from "../../shared/hooks/useDialog.js";
import Icon from "../../shared/components/Icon.jsx";
import { productImageSource } from "../../data/productImages.js";
import { formatCLP } from "../../services/format.js";

export default function CartDrawer({ items, onClose, onIncrease, onDecrease, onRemove, onCheckout }) {
  const dialogRef = useDialog(onClose);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-overlay">
      <div className="cart-backdrop" onClick={onClose} aria-hidden="true" />
      <aside
        ref={dialogRef}
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
      >
        <header className="cart-header">
          <div>
            <h2 id="cart-title">Tu carrito</h2>
            <p>Revisa tus productos antes de pagar.</p>
          </div>
          <button type="button" className="btn btn-icon btn-outline-secondary" onClick={onClose} aria-label="Cerrar carrito">
            <Icon name="close" size={20} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon" aria-hidden="true">
              <Icon name="cart" size={34} />
            </span>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega productos del catálogo para comenzar tu compra.</p>
            <button type="button" className="btn btn-outline-primary" onClick={onClose}>
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="cart-body">
              <ul className="cart-items">
                {items.map((item) => (
                  <li className="cart-item" key={item.id}>
                    <img
                      className="cart-item-image"
                      src={productImageSource(item.image)}
                      alt=""
                    />
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>{formatCLP(item.price)} c/u</p>
                      <div className="cart-item-actions">
                        <div className="quantity-stepper" role="group" aria-label={`Cantidad de ${item.name}`}>
                          <button
                            type="button"
                            onClick={() => onDecrease(item.id)}
                            aria-label={`Disminuir cantidad de ${item.name}`}
                          >
                            <Icon name="minus" size={16} />
                          </button>
                          <span aria-live="polite" aria-label={`Cantidad: ${item.qty}`}>{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => onIncrease(item.id)}
                            aria-label={`Aumentar cantidad de ${item.name}`}
                          >
                            <Icon name="plus" size={16} />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-link cart-remove"
                          onClick={() => onRemove(item.id)}
                          aria-label={`Eliminar ${item.name} del carrito`}
                        >
                          <Icon name="trash" size={16} />
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <strong className="cart-item-total">{formatCLP(item.price * item.qty)}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatCLP(total)}</strong>
              </div>
              <p className="cart-note">
                <Icon name="truck" size={16} />
                El despacho se coordina al finalizar la compra.
              </p>
              <button type="button" className="btn btn-primary btn-lg w-100" onClick={onCheckout}>
                Ir a pagar
                <Icon name="arrowRight" />
              </button>
              <button type="button" className="btn btn-outline-secondary w-100" onClick={onClose}>
                Seguir comprando
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
