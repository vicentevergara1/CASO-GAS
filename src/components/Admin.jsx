import { useState } from "react";

const CATEGORIES = ["Cilindros", "Mangueras", "Reguladores", "Accesorios"];
const IMAGES = [
  "5kg.png", "11kg.png", "15kg.png", "45kg.png", "1.5m.webp", "3m.webp",
  "abrazadera.webp", "kit.jpeg", "regulador-estandar.png", "regulador-alta-presion.png",
  "regulador-dual.png", "porta-cilindro.jpg", "tapa-protectora.webp", "detector.jpg",
];

const blank = {
  name: "",
  category: "Cilindros",
  price: "",
  image: "5kg.png",
  description: "",
  featured: false,
};

export default function Admin({ products, onSave, onDelete, onClose }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...blank });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  const items = products.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()));

  function edit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      image: product.image,
      description: product.description,
      featured: product.featured,
    });
    setMessage("");
    setError("");
    document.getElementById("admin-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reset() {
    setEditingId(null);
    setForm({ ...blank });
  }

  function submit(event) {
    event.preventDefault();
    try {
      onSave(form, editingId);
      setMessage(editingId ? "Producto actualizado correctamente." : "Producto agregado al catálogo.");
      setError("");
      reset();
    } catch (reason) {
      setError(reason.message);
      setMessage("");
    }
  }

  function remove(product) {
    if (!window.confirm(`¿Eliminar ${product.name} del catálogo?`)) return;
    try {
      onDelete(product.id);
      if (editingId === product.id) reset();
      setMessage("Producto eliminado del catálogo.");
      setError("");
    } catch (reason) {
      setError(reason.message);
      setMessage("");
    }
  }

  function change(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  return (
    <section className="py-5 admin-page" id="administracion">
      <div className="container">
        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
          <div>
            <span className="text-primary fw-semibold">GESTIÓN DE PRODUCTOS</span>
            <h1 className="h2 fw-bold mb-1">Administración del catálogo</h1>
            <p className="text-secondary mb-0">Crea, consulta, edita y elimina productos de la tienda.</p>
          </div>
          <button type="button" className="btn btn-outline-primary" onClick={onClose}>Volver a la tienda</button>
        </div>
        <div className="alert alert-info" role="note">
          Vista demostrativa sin inicio de sesión administrativo. Los cambios se guardan solamente en este navegador.
        </div>
        {message && <div className="alert alert-success" role="status">{message}</div>}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <form id="admin-form" onSubmit={submit} className="card shadow-sm border-0 admin-form">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-3">{editingId ? "Editar producto" : "Nuevo producto"}</h2>
                <div className="mb-3">
                  <label className="form-label" htmlFor="admin-name">Nombre</label>
                  <input required id="admin-name" className="form-control" value={form.name} onChange={(event) => change("name", event.target.value)} />
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <label className="form-label" htmlFor="admin-category">Categoría</label>
                    <select id="admin-category" className="form-select" value={form.category} onChange={(event) => change("category", event.target.value)}>
                      {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label" htmlFor="admin-price">Precio ($ CLP)</label>
                    <input required id="admin-price" className="form-control" type="number" min="1" step="1" value={form.price} onChange={(event) => change("price", event.target.value)} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="admin-image">Imagen disponible</label>
                  <select id="admin-image" className="form-select" value={form.image} onChange={(event) => change("image", event.target.value)}>
                    {IMAGES.map((image) => <option key={image} value={image}>{image}</option>)}
                  </select>
                  <img className="admin-image-preview mt-2" src={`${import.meta.env.BASE_URL}assets/images/${form.image}`} alt="Vista previa del producto" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="admin-description">Descripción</label>
                  <textarea required id="admin-description" rows="3" className="form-control" value={form.description} onChange={(event) => change("description", event.target.value)} />
                </div>
                <label className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" checked={form.featured} onChange={(event) => change("featured", event.target.checked)} />
                  <span className="form-check-label">Producto destacado</span>
                </label>
                <div className="d-flex flex-wrap gap-2">
                  <button type="submit" className="btn btn-primary">{editingId ? "Guardar cambios" : "Crear producto"}</button>
                  {editingId && <button type="button" className="btn btn-outline-secondary" onClick={reset}>Cancelar edición</button>}
                </div>
              </div>
            </form>
          </div>
          <div className="col-12 col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-3">
                  <h2 className="h5 fw-bold mb-0">Productos ({products.length})</h2>
                  <input type="search" aria-label="Buscar productos para administrar" className="form-control admin-list-search" placeholder="Buscar producto..." value={filter} onChange={(event) => setFilter(event.target.value)} />
                </div>
                {items.length === 0 ? <p className="text-secondary">No hay productos para mostrar.</p> :
                  <div className="admin-list">
                    {items.map((product) => <div key={product.id} className="admin-list-item">
                      <img src={`${import.meta.env.BASE_URL}assets/images/${product.image}`} alt="" />
                      <div className="admin-list-info">
                        <strong>{product.name}</strong>
                        <span className="text-secondary small">{product.category} · ${product.price.toLocaleString("es-CL")}</span>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => edit(product)}>Editar</button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => remove(product)}>Eliminar</button>
                      </div>
                    </div>)}
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
