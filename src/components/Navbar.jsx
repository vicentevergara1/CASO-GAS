import { useState } from "react";

export default function Navbar({
  cartCount = 0,
  user = null,
  view = "store",
  onCartOpen,
  onSearch,
  onViewChange,
  onLogout,
}) {
  const [open, setOpen] = useState(false);
  const isSeller = user?.role === "VENDEDOR";
  const isAdmin = user?.role === "ADMIN";
  const roleLinks = isSeller
    ? [["Productos", "products"], ["Pedidos", "orders"]]
    : [["Productos", "store"], ["Servicios", "anchor:servicios"], ["Nosotros", "anchor:nosotros"], ["Preguntas frecuentes", "anchor:faq"], ["Contacto", "anchor:contacto"]];

  function navigate(target) {
    setOpen(false);
    if (target.startsWith("anchor:")) {
      onViewChange?.("store");
      window.setTimeout(() => document.getElementById(target.slice(7))?.scrollIntoView({ behavior: "smooth" }), 0);
    } else {
      onViewChange?.(target);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm border-bottom">
      <div className="container-fluid px-3 px-lg-5">
        <a className="navbar-brand d-flex align-items-center gap-2 fw-semibold" href="#inicio" onClick={() => navigate(isSeller ? "products" : "store")}>
          <img src={`${import.meta.env.BASE_URL}assets/images/logo.png`} alt="Gas El Volcán" style={{ height: 42 }} />
          El Volcán
        </a>
        <button className="navbar-toggler" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto">
            {roleLinks.map(([label, target]) => (
              <li className="nav-item" key={target}>
                <a
                  className={`nav-link ${view === target ? "active fw-semibold" : ""}`}
                  href={target.startsWith("anchor:") ? `#${target.slice(7)}` : "#"}
                  onClick={(event) => { event.preventDefault(); navigate(target); }}
                >
                  {label}
                </a>
              </li>
            ))}
            {isAdmin && (
              <>
                <li className="nav-item"><button className={`nav-link btn btn-link ${view === "admin" ? "active fw-semibold" : ""}`} onClick={() => navigate("admin")}>Administración</button></li>
                <li className="nav-item"><button className={`nav-link btn btn-link ${view === "orders" ? "active fw-semibold" : ""}`} onClick={() => navigate("orders")}>Pedidos</button></li>
              </>
            )}
          </ul>

          <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center">
            {!isSeller && <button type="button" className="btn btn-outline-secondary" onClick={() => { setOpen(false); onSearch?.(); }}>🔎 Buscar</button>}
            {!isSeller && <a className="btn btn-outline-dark" href="#login" onClick={() => navigate("store")}>{user ? `Cuenta · ${user.name}` : "Cuenta"}</a>}
            {user && <button type="button" className="btn btn-outline-secondary" onClick={onLogout}>Cerrar sesión</button>}
            {!isSeller && (
              <button type="button" className="btn btn-primary position-relative" onClick={onCartOpen}>
                🛒 Carrito
                {cartCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span>}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
