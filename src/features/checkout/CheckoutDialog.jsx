import { useEffect, useMemo, useState } from "react";
import Icon from "../../shared/components/Icon.jsx";
import useDialog from "../../shared/hooks/useDialog.js";
import { formatCLP } from "../../services/format.js";

const PAYMENT_OPTIONS = [
  {
    id: "card",
    label: "Tarjeta de débito o crédito",
    icon: "card",
    hint: "Pago seguro",
  },
  {
    id: "transfer",
    label: "Transferencia bancaria",
    icon: "bank",
    hint: "Transferencia electrónica",
  },
  {
    id: "cash",
    label: "Pago contra entrega",
    icon: "cash",
    hint: "Al recibir el pedido",
  },
];

export default function CheckoutDialog({ items, onClose, onFinish }) {
  const [step, setStep] = useState("form");
  const [payment, setPayment] = useState("card");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    commune: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const dialogRef = useDialog(onClose);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );

  useEffect(() => {
    if (step === "form") return undefined;
    const timer = window.setTimeout(() => {
      dialogRef.current?.querySelector("h2")?.focus();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [step, dialogRef]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setError("");
  };

  function validate() {
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.address.trim() ||
      !form.commune.trim()
    ) {
      return "Completa todos los datos de entrega.";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Ingresa un correo electrónico válido.";
    }
    if (
      payment === "card" &&
      (form.cardNumber.replace(/\s/g, "").length < 12 ||
        !form.expiry ||
        form.cvv.length < 3)
    ) {
      return "Completa los datos de la tarjeta para continuar.";
    }
    return "";
  }

  function submit(event) {
    event.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setStep("success");
  }

  if (step === "error") {
    return (
      <div className="checkout-overlay">
        <div
          className="checkout-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
        <section
          ref={dialogRef}
          className="checkout-panel checkout-result"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-error-title"
          tabIndex={-1}
        >
          <div className="checkout-result-body">
            <div className="checkout-result-icon is-error" aria-hidden="true">
              !
            </div>
            <span className="badge text-bg-danger">Pago rechazado</span>
            <h2 id="checkout-error-title" tabIndex={-1}>
              No se pudo realizar el pago
            </h2>
            <p className="text-secondary">
              No pudimos procesar el pago. Revisa los datos e inténtalo
              nuevamente.
            </p>
            <p>
              Total del pedido: <strong>{formatCLP(total)}</strong>
            </p>
            <div className="checkout-result-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStep("form")}
              >
                Volver a intentar
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancelar compra
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="checkout-overlay">
        <div
          className="checkout-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
        <section
          ref={dialogRef}
          className="checkout-panel checkout-result"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-success-title"
          tabIndex={-1}
        >
          <div className="checkout-result-body">
            <div className="checkout-result-icon is-success" aria-hidden="true">
              <Icon name="check" size={34} />
            </div>
            <span className="badge text-bg-success">Compra confirmada</span>
            <h2 id="checkout-success-title" tabIndex={-1}>
              ¡Pedido confirmado!
            </h2>
            <p className="text-secondary mb-1">
              Gracias, {form.name || "cliente"}. Recibimos tu pedido
              correctamente.
            </p>
            <p className="text-secondary">
              Total: <strong>{formatCLP(total)}</strong>
            </p>
            <div className="checkout-order-note">
              <strong>Pedido #GV-{Date.now().toString().slice(-6)}</strong>
              <span>
                Te enviaremos la confirmación del pedido a {form.email}.
              </span>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onFinish}
            >
              Volver a la tienda
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="checkout-overlay">
      <div className="checkout-backdrop" onClick={onClose} aria-hidden="true" />
      <section
        ref={dialogRef}
        className="checkout-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        tabIndex={-1}
      >
        <header className="checkout-header">
          <div>
            <span className="checkout-eyebrow">Gas El Volcán</span>
            <h2 id="checkout-title">Finalizar compra</h2>
          </div>
          <button
            type="button"
            className="btn btn-icon btn-outline-secondary"
            onClick={onClose}
            aria-label="Cerrar pago"
          >
            <Icon name="close" size={20} />
          </button>
        </header>

        <form onSubmit={submit} className="checkout-body" noValidate>
          <div className="row g-4">
            <div className="col-12 col-lg-7">
              <section
                className="checkout-section"
                aria-labelledby="delivery-title"
              >
                <h3 id="delivery-title">1. Datos de entrega</h3>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="checkout-name">
                      Nombre completo
                    </label>
                    <input
                      id="checkout-name"
                      className="form-control"
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Ej: Juan Pérez"
                      autoComplete="name"
                      data-autofocus
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="checkout-phone">
                      Teléfono
                    </label>
                    <input
                      id="checkout-phone"
                      className="form-control"
                      required
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+56 9 1234 5678"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="checkout-email">
                      Correo electrónico
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      className="form-control"
                      required
                      value={form.email}
                      onChange={update("email")}
                      placeholder="cliente@correo.cl"
                      autoComplete="email"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="checkout-address">
                      Dirección de entrega
                    </label>
                    <input
                      id="checkout-address"
                      className="form-control"
                      required
                      value={form.address}
                      onChange={update("address")}
                      placeholder="Calle y número"
                      autoComplete="street-address"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="checkout-commune">
                      Comuna
                    </label>
                    <input
                      id="checkout-commune"
                      className="form-control"
                      required
                      value={form.commune}
                      onChange={update("commune")}
                      placeholder="Ej: Maipú"
                      autoComplete="address-level2"
                    />
                  </div>
                </div>
              </section>

              <section
                className="checkout-section"
                aria-labelledby="payment-title"
              >
                <h3 id="payment-title">2. Método de pago</h3>
                <fieldset className="payment-options">
                  <legend className="visually-hidden">
                    Selecciona un método de pago
                  </legend>
                  {PAYMENT_OPTIONS.map((option) => (
                    <label
                      className={`payment-option ${payment === option.id ? "is-active" : ""}`}
                      key={option.id}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={option.id}
                        checked={payment === option.id}
                        onChange={() => {
                          setPayment(option.id);
                          setError("");
                        }}
                      />
                      <span className="payment-icon" aria-hidden="true">
                        <Icon name={option.icon} size={22} />
                      </span>
                      <span className="payment-copy">
                        <strong>{option.label}</strong>
                        <small>{option.hint}</small>
                      </span>
                    </label>
                  ))}
                </fieldset>

                {payment === "card" && (
                  <div className="row g-3 payment-details">
                    <div className="col-12">
                      <label className="form-label" htmlFor="checkout-card">
                        Número de tarjeta
                      </label>
                      <input
                        id="checkout-card"
                        inputMode="numeric"
                        className="form-control"
                        required
                        value={form.cardNumber}
                        onChange={update("cardNumber")}
                        placeholder="1234 5678 9012 3456"
                        autoComplete="cc-number"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label" htmlFor="checkout-expiry">
                        Vencimiento
                      </label>
                      <input
                        id="checkout-expiry"
                        className="form-control"
                        required
                        value={form.expiry}
                        onChange={update("expiry")}
                        placeholder="MM/AA"
                        autoComplete="cc-exp"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label" htmlFor="checkout-cvv">
                        CVV
                      </label>
                      <input
                        id="checkout-cvv"
                        inputMode="numeric"
                        className="form-control"
                        required
                        value={form.cvv}
                        onChange={update("cvv")}
                        placeholder="123"
                        maxLength={4}
                        autoComplete="cc-csc"
                      />
                    </div>
                  </div>
                )}

                {payment === "transfer" && (
                  <div className="alert alert-info mt-3 mb-0" role="note">
                    Al confirmar el pedido te enviaremos los datos bancarios
                    para completar la transferencia.
                  </div>
                )}
                {payment === "cash" && (
                  <div className="alert alert-warning mt-3 mb-0" role="note">
                    El pago se realiza al recibir el pedido. Coordinaremos la
                    entrega contigo.
                  </div>
                )}
              </section>
            </div>

            <div className="col-12 col-lg-5">
              <aside
                className="checkout-summary"
                aria-labelledby="summary-title"
              >
                <h3 id="summary-title">Resumen del pedido</h3>
                <div className="checkout-items">
                  {items.map((item) => (
                    <div className="checkout-item" key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <small>
                          {item.qty} × {formatCLP(item.price)}
                        </small>
                      </div>
                      <strong>{formatCLP(item.price * item.qty)}</strong>
                    </div>
                  ))}
                </div>
                <div className="checkout-total">
                  <span>Total</span>
                  <strong>{formatCLP(total)}</strong>
                </div>
                <p className="checkout-security-note">
                  <Icon name="lock" size={16} />
                  Tus datos están protegidos y se usan solo para procesar el
                  pedido.
                </p>
                {error && (
                  <div className="alert alert-danger mb-0" role="alert">
                    {error}
                  </div>
                )}
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Finalizar pedido · {formatCLP(total)}
                </button>
                <button
                  type="button"
                  className="btn btn-link w-100"
                  onClick={onClose}
                >
                  Volver al carrito
                </button>
              </aside>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
