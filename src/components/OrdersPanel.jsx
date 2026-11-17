import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../services/api.js";

const formatCLP = (amount) => `$${Number(amount || 0).toLocaleString("es-CL")}`;
const formatDate = (value) => {
  if (!value) return "Fecha no disponible";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Fecha no disponible" : date.toLocaleString("es-CL");
};

export default function OrdersPanel({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [detailLoadingId, setDetailLoadingId] = useState(null);
  const [detailError, setDetailError] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/api/v1/orders");
      setOrders(Array.isArray(data) ? data : []);
    } catch (reason) {
      setError(reason.message || "No se pudieron cargar los pedidos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  async function toggleDetails(order) {
    if (expandedId === order.id) {
      setExpandedId(null);
      setDetailError("");
      return;
    }
    setExpandedId(order.id);
    setDetailError("");
    setDetailLoadingId(order.id);
    try {
      const detail = await apiRequest(`/api/v1/orders/${encodeURIComponent(order.id)}`);
      setOrderDetails((current) => ({ ...current, [order.id]: detail }));
    } catch (reason) {
      setDetailError(reason.message || "No se pudo consultar el detalle del pedido.");
    } finally {
      setDetailLoadingId(null);
    }
  }

  return (
    <section className="py-5 admin-page">
      <div className="container">
        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
          <div>
            <span className="text-primary fw-semibold">VENTAS</span>
            <h1 className="h2 fw-bold mb-1">Pedidos</h1>
            <p className="text-secondary mb-0">Consulta pedidos guardados por el backend.</p>
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={onBack}>Volver</button>
            <button type="button" className="btn btn-outline-primary" onClick={loadOrders} disabled={loading}>Actualizar</button>
          </div>
        </div>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {loading ? <p role="status">Cargando pedidos…</p> :
          orders.length === 0 ? <div className="alert alert-info">Todavía no hay pedidos registrados.</div> :
            <div className="card shadow-sm border-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr><th>N.º</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th>Total</th><th>Detalle</th></tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customerName}<br /><small className="text-secondary">{order.email}</small></td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td><span className="badge text-bg-secondary">{order.status}</span></td>
                        <td>{formatCLP(order.total)}</td>
                        <td><button type="button" className="btn btn-sm btn-outline-primary" onClick={() => toggleDetails(order)} aria-expanded={expandedId === order.id}>Ver detalle</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {orders.filter((order) => order.id === expandedId).map((summary) => {
                const order = orderDetails[summary.id] || summary;
                return (
                <div className="border-top p-3 p-md-4" key={`detail-${order.id}`}>
                  <h2 className="h5">Pedido #{order.id}</h2>
                  {detailLoadingId === order.id && <p role="status">Cargando detalle…</p>}
                  {detailError && <div className="alert alert-warning py-2" role="alert">{detailError}</div>}
                  <p className="text-secondary mb-3">{order.address}, {order.commune} · {order.phone}</p>
                  <ul className="list-group">
                    {(order.items || []).map((item) => (
                      <li className="list-group-item d-flex justify-content-between gap-3" key={`${order.id}-${item.productId}`}>
                        <span>{item.productName} · {item.quantity} × {formatCLP(item.unitPrice)}</span>
                        <strong>{formatCLP(item.quantity * item.unitPrice)}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
                );
              })}
            </div>}
      </div>
    </section>
  );
}
