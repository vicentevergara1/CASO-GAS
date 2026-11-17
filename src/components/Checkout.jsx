import { useMemo, useState } from "react";

const PAYMENT_OPTIONS = [
  { id: "card", label: "Tarjeta de débito/crédito", icon: "💳" },
  { id: "transfer", label: "Transferencia bancaria", icon: "🏦" },
  { id: "cash", label: "Pago contra entrega", icon: "💵" },
];

function formatCLP(value) {
  return `$${value.toLocaleString("es-CL")}`;
}

export default function Checkout({ items, onClose, onFinish, user }) {
  const [step, setStep] = useState("form");
  const [payment, setPayment] = useState("card");
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
    address: "",
    commune: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
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
    return "";
  }

  async function submit(event) {
    event.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const createdOrder = await onFinish({
        ...form,
        paymentMethod: payment,
        items: items.map(({ id, qty }) => ({ id, qty })),
      });
      setOrder(createdOrder);
      setStep("success");
    } catch (reason) {
      setError(reason.message || "No se pudo registrar el pedido. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "success") {
    return (
      <div className="checkout-overlay" role="dialog" aria-modal="true" aria-label="Compra confirmada">
        <div className="checkout-panel checkout-success">
          <div className="text-center p-4 p-md-5">
            <div className="checkout-success-icon" aria-hidden="true">✓</div>
            <span className="badge text-bg-success mb-3">Pedido registrado</span>
            <h2 className="fw-bold">¡Pedido recibido!</h2>
            <p className="text-secondary mb-1">Gracias, {form.name || "cliente"}. El backend guardó tu pedido.</p>
            <p className="text-secondary">Estado: <strong>{order?.status || "PENDIENTE"}</strong> · Total: <strong>{formatCLP(order?.total ?? total)}</strong></p>
            <div className="alert alert-info text-start mt-4">
              <strong>Pedido #{order?.id ?? "—"}</strong>
              <br />
              El pedido quedó asociado a la cuenta activa y al correo <strong>{order?.email || form.email}</strong>.
            </div>
            <button className="btn btn-primary btn-lg px-4" onClick={onClose}>
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
                    <input id="checkout-name" className="form-control" value={form.name} onChange={update("name")} placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="checkout-phone">Teléfono</label>
                    <input id="checkout-phone" className="form-control" value={form.phone} onChange={update("phone")} placeholder="+56 9 1234 5678" />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="checkout-email">Correo electrónico</label>
                    <input id="checkout-email" type="email" className="form-control" value={form.email} onChange={update("email")} placeholder="cliente@correo.cl" />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="checkout-address">Dirección de entrega</label>
                    <input id="checkout-address" className="form-control" value={form.address} onChange={update("address")} placeholder="Calle y número" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="checkout-commune">Comuna</label>
                    <input id="checkout-commune" className="form-control" value={form.commune} onChange={update("commune")} placeholder="Ej: Maipú" />
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

                <div className="alert alert-info mt-3 mb-0">
                  El backend registra el método seleccionado, pero esta evaluación no conecta una pasarela de pago ni procesa cobros.
                </div>
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
                <div className="small text-secondary mt-2">El stock y el precio se vuelven a validar en el backend al enviar el pedido.</div>
                {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary btn-lg w-100 mt-4" disabled={submitting || items.length === 0}>{submitting ? "Enviando pedido…" : `Registrar pedido · ${formatCLP(total)}`}</button>
                <button type="button" className="btn btn-link w-100 mt-1" onClick={onClose}>Volver al carrito</button>
              </aside>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
