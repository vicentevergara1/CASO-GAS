import { isUploadedImage, productImageSource } from "../../../data/productImages.js";
import Icon from "../../../shared/components/Icon.jsx";

const CATEGORIES = ["Cilindros", "Mangueras", "Reguladores", "Accesorios"];
const IMAGES = [
  "5kg.png", "11kg.png", "15kg.png", "45kg.png", "1.5m.webp", "3m.webp",
  "abrazadera.webp", "kit.jpeg", "regulador-estandar.png", "regulador-alta-presion.png",
  "regulador-dual.png", "porta-cilindro.jpg", "tapa-protectora.webp", "detector.jpg",
];

export default function AdminProductForm({
  form,
  editingId,
  uploading,
  photoInput,
  onChange,
  onImageChange,
  onUpload,
  onSubmit,
  onReset,
}) {
  return (
    <form id="admin-form" onSubmit={onSubmit} className="card admin-card admin-form" noValidate>
      <div className="card-body">
        <div className="admin-card-heading">
          <div>
            <span className="section-eyebrow">{editingId ? "Edición" : "Nuevo producto"}</span>
            <h2>{editingId ? "Editar producto" : "Agregar producto"}</h2>
          </div>
          {editingId && <span className="badge text-bg-primary">Editando</span>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="admin-name">Nombre</label>
          <input
            required
            id="admin-name"
            className="form-control"
            value={form.name}
            onChange={(event) => onChange("name", event.target.value)}
            placeholder="Ej: Cilindro Gas 15 Kg"
          />
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <label className="form-label" htmlFor="admin-category">Categoría</label>
            <select
              id="admin-category"
              className="form-select"
              value={form.category}
              onChange={(event) => onChange("category", event.target.value)}
            >
              {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
            </select>
          </div>
          <div className="col-12 col-sm-6">
            <label className="form-label" htmlFor="admin-price">Precio ($ CLP)</label>
            <input
              required
              id="admin-price"
              className="form-control"
              type="number"
              min="1"
              step="1"
              value={form.price}
              onChange={(event) => onChange("price", event.target.value)}
              placeholder="15000"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="admin-image">Imagen del catálogo</label>
          <select
            id="admin-image"
            className="form-select"
            value={isUploadedImage(form.image) ? "uploaded" : form.image}
            onChange={(event) => onImageChange(event.target.value)}
          >
            {isUploadedImage(form.image) && <option value="uploaded">Fotografía subida desde el equipo</option>}
            {IMAGES.map((image) => <option key={image} value={image}>{image}</option>)}
          </select>

          <label className="form-label mt-3" htmlFor="admin-upload">
            O sube una fotografía
          </label>
          <input
            ref={photoInput}
            id="admin-upload"
            className="form-control"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onUpload}
            disabled={uploading}
            aria-describedby="admin-upload-help"
          />
          <div id="admin-upload-help" className="form-text">
            Formatos JPG, PNG o WEBP, hasta 8 MB. La foto se guarda en este navegador.
          </div>

          {uploading && (
            <div role="status" className="admin-upload-status">
              Preparando fotografía...
            </div>
          )}

          <div className="admin-image-preview-box">
            <img className="admin-image-preview" src={productImageSource(form.image)} alt="Vista previa del producto" />
            <span>
              {isUploadedImage(form.image) ? "Fotografía cargada en este navegador" : "Imagen del catálogo"}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="admin-description">Descripción</label>
          <textarea
            required
            id="admin-description"
            rows="3"
            className="form-control"
            value={form.description}
            onChange={(event) => onChange("description", event.target.value)}
            placeholder="Describe el producto y su uso principal."
          />
        </div>

        <label className="form-check admin-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={form.featured}
            onChange={(event) => onChange("featured", event.target.checked)}
          />
          <span className="form-check-label">Producto destacado</span>
        </label>

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary" disabled={uploading}>
            <Icon name={editingId ? "check" : "plus"} />
            {editingId ? "Guardar cambios" : "Crear producto"}
          </button>
          {editingId && (
            <button type="button" className="btn btn-outline-secondary" onClick={onReset}>
              Cancelar edición
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
