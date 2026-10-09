import { useMemo, useState } from "react";

const PAYMENT_OPTIONS = [
  { id: "card", label: "Tarjeta de débito/crédito", icon: "💳" },
  { id: "transfer", label: "Transferencia bancaria", icon: "🏦" },
  { id: "cash", label: "Pago contra entrega", icon: "💵" },
];

function formatCLP(value) {
  return `$${value.toLocaleString("es-CL")}`;
}

export default function Checkout({ items, onClose, onFinish }) {
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
  const [order, setOrder] = useState(null);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setError("");
  };

  function validate() {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.address.trim() || !form.commune.trim()) {
      return "Completa todos los datos de entrega.";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Ingresa un correo electrónico válido.";
    }
    if (payment === "card" && (form.cardNumber.replace(/\s/g, "").length < 12 || !form.expiry || form.cvv.length < 3)) {
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
    // Para la evaluación se puede simular un rechazo usando una tarjeta terminada en 0000.
    if (payment === "card" && form.cardNumber.replace(/\s/g, "").endsWith("0000")) {
      setStep("error");
      return;
    }
    setOrder({ id: `GV-${Date.now().toString().slice(-6)}`, customer: { name: form.name, email: form.email, phone: form.phone, address: form.address, commune: form.commune }, items, total, payment, status: "Recibido", createdAt: new Date().toISOString() });
    setStep("success");
  }

  if (step === "error") {
    return <div className="checkout-overlay" role="dialog" aria-modal="true" aria-label="Pago rechazado"><div className="checkout-panel checkout-success"><div className="text-center p-4 p-md-5"><div className="checkout-error-icon" aria-hidden="true">!</div><span className="badge text-bg-danger mb-3">Pago rechazado (simulación)</span><h2 className="fw-bold">No pudimos validar el pago</h2><p className="text-secondary">La tarjeta de prueba terminada en 0000 genera un rechazo simulado. No se realizó ningún cobro.</p><button className="btn btn-primary me-2" onClick={() => setStep("form")}>Intentar nuevamente</button><button className="btn btn-outline-secondary mt-2 mt-sm-0" onClick={onClose}>Volver a la tienda</button></div></div></div>;
  }

  if (step === "success") {
    return (
      <div className="checkout-overlay" role="dialog" aria-modal="true" aria-label="Compra confirmada">
        <div className="checkout-panel checkout-success">
          <div className="text-center p-4 p-md-5">
            <div className="checkout-success-icon" aria-hidden="true">✓</div>
            <span className="badge text-bg-success mb-3">Compra realizada</span>
            <h2 className="fw-bold">¡Pedido confirmado!</h2>
            <p className="text-secondary mb-1">Gracias, {form.name || "cliente"}. Recibimos tu solicitud correctamente.</p>
            <p className="text-secondary">Total pagado/por pagar: <strong>{formatCLP(total)}</strong></p>
            <div className="alert alert-info text-start mt-4">
              <strong>Pedido #{order?.id || `GV-${Date.now().toString().slice(-6)}`}</strong>
              <br />
              Te enviaremos la información del pedido a <strong>{form.email}</strong>.
            </div>
            <button className="btn btn-primary btn-lg px-4" onClick={() => onFinish(order)}>
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-overlay" role="dialog" aria-modal="true" aria-label="Finalizar compra">
      <div className="checkout-panel">
        <header className="checkout-header">
          <div>
            <span className="text-primary fw-semibold small">GAS EL VOLCÁN</span>
            <h2 className="h4 mb-0">Finalizar compra</h2>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Cerrar pago" />
        </header>

        <form onSubmit={submit} className="checkout-body">
          <div className="row g-4">
            <div className="col-12 col-lg-7">
              <section className="checkout-section">
                <h3 className="h5 fw-bold">1. Datos de entrega</h3>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="checkout-name">Nombre completo</label>
                    <input id="checkout-name" className="form-control" autoComplete="name" required value={form.name} onChange={update("name")} placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="checkout-phone">Teléfono</label>
                    <input id="checkout-phone" className="form-control" autoComplete="tel" required value={form.phone} onChange={update("phone")} placeholder="+56 9 1234 5678" />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="checkout-email">Correo electrónico</label>
                    <input id="checkout-email" type="email" autoComplete="email" required className="form-control" value={form.email} onChange={update("email")} placeholder="cliente@correo.cl" />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="checkout-address">Dirección de entrega</label>
                    <input id="checkout-address" className="form-control" autoComplete="street-address" required value={form.address} onChange={update("address")} placeholder="Calle y número" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="checkout-commune">Comuna</label>
                    <input id="checkout-commune" className="form-control" required value={form.commune} onChange={update("commune")} placeholder="Ej: Maipú" />
                  </div>
                </div>
              </section>

              <section className="checkout-section mt-4">
                <h3 className="h5 fw-bold">2. Método de pago</h3>
                <div className="row g-2">
                  {PAYMENT_OPTIONS.map((option) => (
                    <div className="col-12 col-md-4" key={option.id}>
                      <button
                        type="button"
                        className={`payment-option w-100 ${payment === option.id ? "active" : ""}`}
                        onClick={() => { setPayment(option.id); setError(""); }}
                      >
                        <span className="fs-4 d-block">{option.icon}</span>
                        <span>{option.label}</span>
                      </button>
                    </div>
                  ))}
                </div>

                {payment === "card" && (
                  <div className="row g-3 mt-2 payment-details">
                    <div className="col-12">
                      <label className="form-label" htmlFor="checkout-card">Número de tarjeta</label>
                      <input id="checkout-card" inputMode="numeric" className="form-control" value={form.cardNumber} onChange={update("cardNumber")} placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="col-6">
                      <label className="form-label" htmlFor="checkout-expiry">Vencimiento</label>
                      <input id="checkout-expiry" className="form-control" value={form.expiry} onChange={update("expiry")} placeholder="MM/AA" />
                    </div>
                    <div className="col-6">
                      <label className="form-label" htmlFor="checkout-cvv">CVV</label>
                      <input id="checkout-cvv" inputMode="numeric" className="form-control" value={form.cvv} onChange={update("cvv")} placeholder="123" maxLength={4} />
                    </div>
                  </div>
                )}

                {payment === "transfer" && (
                  <div className="alert alert-info mt-3 mb-0">Al confirmar, se mostrarán los datos para realizar la transferencia.</div>
                )}
                {payment === "cash" && (
                  <div className="alert alert-warning mt-3 mb-0">El pago se realizará al recibir el pedido, según disponibilidad de despacho.</div>
                )}
              </section>
            </div>

            <div className="col-12 col-lg-5">
              <aside className="checkout-summary">
                <h3 className="h5 fw-bold">Resumen del pedido</h3>
                <div className="checkout-items">
                  {items.map((item) => (
                    <div className="d-flex justify-content-between gap-3 py-2 border-bottom" key={item.id}>
                      <div>
                        <strong className="d-block">{item.name}</strong>
                        <small className="text-secondary">{item.qty} x {formatCLP(item.price)}</small>
                      </div>
                      <strong>{formatCLP(item.price * item.qty)}</strong>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between fs-5 pt-3">
                  <strong>Total</strong>
                  <strong>{formatCLP(total)}</strong>
                </div>
                <div className="small text-secondary mt-2">🔒 Esta es una simulación de pago para la evaluación.</div>
                {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">Finalizar pedido · {formatCLP(total)}</button>
                <button type="button" className="btn btn-link w-100 mt-1" onClick={onClose}>Volver al carrito</button>
              </aside>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
