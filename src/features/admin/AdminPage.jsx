import { useRef, useState } from "react";
import { isUploadedImage, prepareProductImage } from "../../data/productImages.js";
import { normalizeText } from "../../services/format.js";
import Icon from "../../shared/components/Icon.jsx";
import AdminProductForm from "./components/AdminProductForm.jsx";
import AdminProductList from "./components/AdminProductList.jsx";

const BLANK_PRODUCT = {
  name: "",
  category: "Cilindros",
  price: "",
  image: "5kg.png",
  description: "",
  featured: false,
};

export default function AdminPage({ products, onSave, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...BLANK_PRODUCT });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [uploading, setUploading] = useState(false);
  const uploadRequest = useRef(0);
  const photoInput = useRef(null);

  const items = products.filter((product) =>
    normalizeText(product.name).includes(normalizeText(filter))
  );

  function reset() {
    uploadRequest.current += 1;
    setUploading(false);
    if (photoInput.current) photoInput.current.value = "";
    setEditingId(null);
    setForm({ ...BLANK_PRODUCT });
  }

  function edit(product) {
    uploadRequest.current += 1;
    setUploading(false);
    if (photoInput.current) photoInput.current.value = "";
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
    window.setTimeout(() => {
      document.getElementById("admin-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
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

  async function uploadPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const request = ++uploadRequest.current;
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const image = await prepareProductImage(file);
      if (request !== uploadRequest.current) return;
      setForm((current) => ({ ...current, image }));
    } catch (reason) {
      if (request === uploadRequest.current) setError(reason.message);
    } finally {
      if (request === uploadRequest.current) setUploading(false);
      if (photoInput.current) photoInput.current.value = "";
    }
  }

  function change(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function changeImage(value) {
    uploadRequest.current += 1;
    setUploading(false);
    change("image", value);
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="container admin-topbar-inner">
          <a className="admin-brand" href="#/">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/logo.png`}
              alt=""
              width="44"
              height="44"
            />
            <span>
              <strong>Gas El Volcán</strong>
              <small>Administración</small>
            </span>
          </a>
          <a className="btn btn-outline-secondary" href="#/">
            <Icon name="home" />
            Volver a la tienda
          </a>
        </div>
      </header>

      <main id="contenido-principal" className="admin-main" tabIndex={-1}>
        <div className="container">
          <div className="admin-page-heading">
            <div>
              <span className="section-eyebrow">Catálogo</span>
              <h1>Administración del catálogo</h1>
              <p>Crea, consulta, edita y elimina productos de la tienda.</p>
            </div>
          </div>

          {message && <div className="alert alert-success" role="status">{message}</div>}
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <div className="row g-4">
            <div className="col-12 col-lg-5">
              <AdminProductForm
                form={form}
                editingId={editingId}
                uploading={uploading}
                photoInput={photoInput}
                onChange={change}
                onImageChange={changeImage}
                onUpload={uploadPhoto}
                onSubmit={submit}
                onReset={reset}
              />
            </div>
            <div className="col-12 col-lg-7">
              <AdminProductList
                products={products}
                items={items}
                filter={filter}
                onFilterChange={setFilter}
                onClearFilter={() => setFilter("")}
                onEdit={edit}
                onRemove={remove}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
