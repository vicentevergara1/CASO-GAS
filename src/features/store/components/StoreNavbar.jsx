import { useEffect, useState } from "react";
import Icon from "../../../shared/components/Icon.jsx";

const LINKS = [
  ["Productos", "#productos"],
  ["Servicios", "#servicios"],
  ["Nosotros", "#nosotros"],
  ["Preguntas frecuentes", "#faq"],
  ["Contacto", "#contacto"],
];

export default function StoreNavbar({ cartCount = 0, onCartOpen, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <nav className="navbar app-navbar" aria-label="Navegación principal">
      <div className="container app-navbar-inner">
        <a className="navbar-brand app-brand" href="#/" onClick={closeMenu}>
          <img
            src={`${import.meta.env.BASE_URL}assets/images/logo.png`}
            alt=""
            width="46"
            height="46"
          />
          <span className="app-brand-text">
            <strong>Gas El Volcán</strong>
            <small>Distribuidora de gas</small>
          </span>
        </a>

        <button
          type="button"
          className="navbar-toggler app-menu-toggle"
          aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={menuOpen}
          aria-controls="store-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
        </button>

        <div
          id="store-navigation"
          className={`navbar-collapse app-navbar-collapse ${menuOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav app-nav-links">
            {LINKS.map(([label, href]) => (
              <li className="nav-item" key={href}>
                <a className="nav-link" href={href} onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="app-nav-actions">
            <button type="button" className="btn btn-outline-secondary" onClick={() => { closeMenu(); onSearch?.(); }}>
              <Icon name="search" />
              <span>Buscar</span>
            </button>
            <a className="btn btn-outline-secondary" href="#cuenta" onClick={closeMenu}>
              <Icon name="user" />
              <span>Mi cuenta</span>
            </a>
            <button
              type="button"
              className="btn btn-primary app-cart-button"
              onClick={() => { closeMenu(); onCartOpen?.(); }}
              aria-label={`Abrir carrito, ${cartCount} ${cartCount === 1 ? "producto" : "productos"}`}
            >
              <Icon name="cart" />
              <span>Carrito</span>
              {cartCount > 0 && <span className="app-cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
