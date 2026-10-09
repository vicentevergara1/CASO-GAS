import { useEffect, useMemo, useState } from "react";
import { createProduct, deleteProduct, updateProduct } from "../data/products.js";
import { readStorage, writeStorage, STORAGE_KEYS } from "../data/persistence.js";

const blank = { name: "", category: "Cilindros", price: "", image: "5kg.png", description: "", featured: false };
const money = (value) => `$${Number(value || 0).toLocaleString("es-CL")}`;

export default function Admin({ products, onProductsChange }) {
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [users, setUsers] = useState(() => readStorage(STORAGE_KEYS.users, []));
  const [orders, setOrders] = useState(() => readStorage(STORAGE_KEYS.orders, []));
  useEffect(() => {
    const refresh = () => { setUsers(readStorage(STORAGE_KEYS.users, [])); setOrders(readStorage(STORAGE_KEYS.orders, [])); };
    window.addEventListener("gas-volcan-data-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("gas-volcan-data-updated", refresh); window.removeEventListener("storage", refresh); };
  }, []);
  const stats = useMemo(() => ({ products: products.length, users: users.length, orders: orders.length }), [products, users, orders]);

  function submit(event) {
    event.preventDefault(); setError(""); setNotice("");
    try {
      if (editingId) updateProduct(editingId, form);
      else createProduct({ ...form, id: `producto-${Date.now()}` });
      onProductsChange(); setForm(blank); setEditingId(null); setNotice(editingId ? "Producto actualizado." : "Producto creado.");
    } catch (err) { setError(err.message || "No se pudo guardar el producto."); }
  }
  function edit(product) {
    setEditingId(product.id);
    setForm({ name: product.name, category: product.category, price: String(product.price), image: product.image || "5kg.png", description: product.description || "", featured: Boolean(product.featured) });
    setError(""); setNotice("");
  }
  function remove(product) {
    if (!window.confirm(`¿Eliminar ${product.name}?`)) return;
    deleteProduct(product.id); onProductsChange(); setNotice("Producto eliminado.");
    if (editingId === product.id) { setEditingId(null); setForm(blank); }
  }
  function exportOrders() {
    const blob = new Blob([JSON.stringify(orders, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "pedidos-gas-el-volcan.json"; link.click(); URL.revokeObjectURL(url);
  }
  return <section id="administracion" className="py-5 bg-light"><div className="container">
    <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4"><div><span className="text-primary fw-semibold">GESTIÓN INTERNA</span><h2 className="display-6 fw-bold">Panel de administración</h2><p className="text-secondary mb-0">Demostración académica: los datos se guardan en este navegador.</p></div><button className="btn btn-outline-secondary" onClick={exportOrders}>Exportar pedidos JSON</button></div>
    <div className="row g-3 mb-4">{[["Productos",stats.products],["Usuarios registrados",stats.users],["Pedidos guardados",stats.orders]].map(([label,value])=><div className="col-12 col-md-4" key={label}><div className="card border-0 shadow-sm"><div className="card-body"><p className="text-secondary mb-1">{label}</p><div className="display-6 fw-bold">{value}</div></div></div></div>)}</div>
    <div className="row g-4"><div className="col-12 col-lg-4"><div className="card border-0 shadow-sm"><div className="card-body"><h3 className="h5">{editingId ? "Editar producto" : "Crear producto"}</h3>
      {error && <div role="alert" className="alert alert-danger">{error}</div>}{notice && <div role="status" className="alert alert-success">{notice}</div>}
      <form onSubmit={submit}><label className="form-label" htmlFor="admin-name">Nombre</label><input id="admin-name" className="form-control mb-3" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <label className="form-label" htmlFor="admin-category">Categoría</label><select id="admin-category" className="form-select mb-3" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{["Cilindros","Mangueras","Reguladores","Accesorios","Ofertas"].map(c=><option key={c}>{c}</option>)}</select>
      <label className="form-label" htmlFor="admin-price">Precio (CLP)</label><input id="admin-price" type="number" min="0" step="1" required className="form-control mb-3" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
      <label className="form-label" htmlFor="admin-image">Archivo de imagen</label><input id="admin-image" className="form-control mb-3" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="5kg.png"/>
      <label className="form-label" htmlFor="admin-description">Descripción</label><textarea id="admin-description" className="form-control mb-3" rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      <div className="form-check mb-3"><input id="admin-featured" type="checkbox" className="form-check-input" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/><label htmlFor="admin-featured" className="form-check-label">Mostrar como destacado/oferta</label></div>
      <button className="btn btn-primary w-100">{editingId ? "Guardar cambios" : "Crear producto"}</button>{editingId && <button type="button" className="btn btn-link w-100" onClick={()=>{setEditingId(null);setForm(blank);setError("");}}>Cancelar edición</button>}</form>
    </div></div></div>
    <div className="col-12 col-lg-8"><div className="card border-0 shadow-sm"><div className="card-body"><h3 className="h5">Productos del catálogo</h3><div className="table-responsive"><table className="table table-hover align-middle"><thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>{products.map(p=><tr key={p.id}><td><strong>{p.name}</strong><div className="small text-secondary">ID: {p.id}</div></td><td>{p.category}</td><td>{money(p.price)}</td><td><div className="d-flex gap-2"><button className="btn btn-sm btn-outline-primary" onClick={()=>edit(p)}>Editar</button><button className="btn btn-sm btn-outline-danger" onClick={()=>remove(p)}>Eliminar</button></div></td></tr>)}</tbody></table></div>
      <h3 className="h5 mt-4">Usuarios registrados</h3>{users.length ? <ul className="list-group">{users.map((u,i)=><li className="list-group-item" key={u.email || i}>{u.name || "Usuario"} — {u.email}</li>)}</ul> : <p className="text-secondary">Todavía no hay registros en este navegador.</p>}
      <h3 className="h5 mt-4">Pedidos</h3>{orders.length ? <div className="table-responsive"><table className="table"><thead><tr><th>Número</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead><tbody>{orders.map((o,i)=><tr key={o.id || i}><td>{o.id}</td><td>{o.customer?.name}</td><td>{money(o.total)}</td><td>{o.status || "Recibido"}</td></tr>)}</tbody></table></div> : <p className="text-secondary">Todavía no hay pedidos guardados.</p>}</div></div></div></div>
  </div></section>;
}
