import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Navbar from "./components/Navbar.jsx";
import ProductCatalog from "./ProductCatalog.jsx";
import Cart from "./components/Cart.jsx";
import SearchModal from "./components/SearchModal.jsx";
import Checkout from "./components/Checkout.jsx";
import Login from "./Login.jsx";
import Admin from "./components/Admin.jsx";
import OrdersPanel from "./components/OrdersPanel.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { apiRequest } from "./services/api.js";
import { readCart, saveCart } from "./data/products.js";

function StoreApp() {
  const { user, loading: authLoading, login, register, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [cart, setCart] = useState([]);
  const [cartReady, setCartReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [view, setView] = useState("store");
  const [query, setQuery] = useState("");
  const [accountPrompt, setAccountPrompt] = useState("");
  const cartRestored = useRef(false);

  const refreshProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsError("");
    try {
      const data = await apiRequest("/api/v1/products", { auth: false });
      if (!Array.isArray(data)) throw new Error("El backend respondió con un catálogo inválido.");
      setProducts(data);
      if (!cartRestored.current) {
        setCart(readCart(data));
        cartRestored.current = true;
        setCartReady(true);
      }
      return data;
    } catch (reason) {
      setProductsError(reason.message || "No se pudo cargar el catálogo.");
      return null;
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
    apiRequest("/api/v1/categories", { auth: false })
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, [refreshProducts]);

  useEffect(() => {
    if (cartReady) saveCart(cart);
  }, [cart, cartReady]);

  const isSeller = user?.role === "VENDEDOR";
  const isAdmin = user?.role === "ADMIN";
  const canPlaceOrders = user?.role === "CLIENTE" || isAdmin;
  const currentCart = useMemo(() => cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ ...product, qty: item.qty }] : [];
  }), [cart, products]);
  const count = useMemo(() => currentCart.reduce((sum, item) => sum + item.qty, 0), [currentCart]);

  useEffect(() => {
    setView(isSeller ? "products" : "store");
    if (isSeller) {
      setCartOpen(false);
      setSearchOpen(false);
      setCheckoutOpen(false);
    }
  }, [isSeller]);

  function navigate(nextView) {
    if (isSeller && !["products", "orders"].includes(nextView)) return;
    if (!isAdmin && nextView === "admin") return;
    if (!isAdmin && nextView === "orders" && !isSeller) return;
    setView(nextView);
    setCartOpen(false);
    setSearchOpen(false);
    setCheckoutOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product, quantity = 1) {
    if (isSeller) return;
    const amount = Math.max(1, Math.min(50, Math.floor(Number(quantity) || 1)));
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, qty: Math.min(50, item.qty + amount) } : item)
        : [...current, { id: product.id, qty: amount }];
    });
    setSearchOpen(false);
    setQuery("");
    setCartOpen(true);
  }

  function changeQuantity(id, change) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, qty: Math.min(50, item.qty + change) } : item)
      .filter((item) => item.qty > 0));
  }

  async function saveProduct(fields, id) {
    const payload = {
      name: String(fields.name || "").trim(),
      category: fields.category,
      price: Number(fields.price),
      stock: Number(fields.stock),
      image: fields.image,
      description: String(fields.description || "").trim(),
      featured: Boolean(fields.featured),
    };
    const saved = id
      ? await apiRequest(`/api/v1/products/${encodeURIComponent(id)}`, { method: "PUT", body: payload })
      : await apiRequest("/api/v1/products", { method: "POST", body: payload });
    await refreshProducts();
    return saved;
  }

  async function removeProduct(id) {
    await apiRequest(`/api/v1/products/${encodeURIComponent(id)}`, { method: "DELETE" });
    setCart((current) => current.filter((item) => item.id !== id));
    await refreshProducts();
  }

  async function placeOrder(payload) {
    const order = await apiRequest("/api/v1/orders", { method: "POST", body: payload });
    setCart([]);
    await refreshProducts();
    return order;
  }

  function beginCheckout() {
    setCartOpen(false);
    if (!user) {
      setAccountPrompt("Inicia sesión o crea una cuenta de cliente para registrar el pedido.");
      setView("store");
      window.setTimeout(() => document.getElementById("login")?.scrollIntoView({ behavior: "smooth" }), 0);
      return;
    }
    if (!canPlaceOrders) {
      setAccountPrompt("El rol de vendedor solo puede consultar productos y pedidos.");
      return;
    }
    setAccountPrompt("");
    setCheckoutOpen(true);
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
    }
    setView("store");
  }

  async function handleLogin(credentials) {
    const signedInUser = await login(credentials);
    setAccountPrompt("");
    return signedInUser;
  }

  async function handleRegister(account) {
    const newUser = await register(account);
    setAccountPrompt("");
    return newUser;
  }

  if (authLoading) {
    return <main className="d-flex min-vh-100 align-items-center justify-content-center" role="status">Verificando sesión…</main>;
  }

  const catalog = productsError
    ? <div className="container"><div className="alert alert-danger" role="alert">{productsError}<div><button type="button" className="btn btn-sm btn-outline-danger mt-2" onClick={refreshProducts}>Reintentar conexión</button></div></div></div>
    : productsLoading
      ? <div className="container py-5"><p role="status">Cargando catálogo desde el backend…</p></div>
      : <ProductCatalog products={products} categories={categories} onAdd={addToCart} readOnly={isSeller} />;

  let content;
  if (isSeller) {
    content = view === "orders"
      ? <OrdersPanel onBack={() => navigate("products")} />
      : <main id="inicio" className="store-main" style={{ paddingTop: 84 }}>
          <section className="py-4 bg-light border-bottom">
            <div className="container"><span className="badge text-bg-info mb-2">Vista de vendedor</span><h1 className="h2 fw-bold mb-1">Productos</h1><p className="text-secondary mb-0">Consulta el catálogo y el detalle de cada producto.</p></div>
          </section>
          {catalog}
        </main>;
  } else if (view === "admin" && isAdmin) {
    content = <main style={{ paddingTop: 84 }}><Admin products={products} categories={categories} onSave={saveProduct} onDelete={removeProduct} onClose={() => navigate("store")} /></main>;
  } else if (view === "orders" && isAdmin) {
    content = <main style={{ paddingTop: 84 }}><OrdersPanel onBack={() => navigate("store")} /></main>;
  } else {
    content = (
      <main id="inicio" className="store-main" style={{ paddingTop: 84 }}>
        <section className="hero-section">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="container hero-container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6 hero-copy">
                <span className="hero-kicker"><span className="hero-kicker-dot" /> Energía para tu día a día</span>
                <h1>El gas que necesitas, <span>cerca de ti.</span></h1>
                <p className="hero-description">Encuentra cilindros, reguladores y accesorios para tu hogar o negocio en un solo lugar.</p>
                <div className="hero-actions">
                  <a className="btn btn-primary btn-lg hero-primary-button" href="#productos">Explorar catálogo <span aria-hidden="true">→</span></a>
                  <a className="hero-text-link" href="#servicios">Conoce nuestros servicios</a>
                </div>
                <div className="hero-highlights">
                  <div className="hero-highlight"><span className="hero-highlight-icon">✓</span><span>Compra simple</span></div>
                  <div className="hero-highlight"><span className="hero-highlight-icon">✓</span><span>Hogar y negocio</span></div>
                  <div className="hero-highlight"><span className="hero-highlight-icon">✓</span><span>Atención cercana</span></div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-visual" aria-label="Cilindro de gas para el hogar">
                  <div className="hero-visual-ring" aria-hidden="true" />
                  <div className="hero-visual-glow" aria-hidden="true" />
                  <img className="hero-cylinder" src={`${import.meta.env.BASE_URL}assets/images/15kg.png`} alt="Cilindro de gas de 15 kilogramos" />
                  <div className="hero-floating-note">
                    <span className="hero-floating-label">GAS EL VOLCÁN</span>
                    <strong>Soluciones para tu hogar</strong>
                    <span>Cilindros y accesorios</span>
                  </div>
                  <div className="hero-sticker"><span>+</span> Calidad y confianza</div>
                </div>
              </div>
            </div>
            <div className="hero-bottom-line">
              <span>Explora nuestras categorías</span>
              <span className="hero-bottom-divider" />
              <span>{products.length ? `${products.length} productos en catálogo` : "Catálogo en línea"}</span>
            </div>
          </div>
        </section>
        {catalog}
        <section id="servicios" className="services-section">
          <div className="container">
            <div className="section-heading text-center mx-auto">
              <span className="section-eyebrow">LO QUE ENCONTRARÁS</span>
              <h2>Todo lo que necesitas, más fácil</h2>
              <p>Una experiencia simple para encontrar los productos adecuados para cada espacio.</p>
            </div>
            <div className="row g-4 mt-2">
              {[["01", "Compra simple", "Revisa el catálogo, compara alternativas y agrega tus productos al carrito."], ["02", "Para cada necesidad", "Encuentra formatos de cilindros, mangueras, reguladores y accesorios."], ["03", "Atención cercana", "Un espacio digital pensado para acompañarte en cada consulta y pedido."]].map(([number, title, text]) => (
                <div className="col-12 col-md-4" key={number}>
                  <article className="service-card h-100">
                    <span className="service-number">{number}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <span className="service-arrow" aria-hidden="true">↗</span>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="nosotros" className="about-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="about-image-wrap">
                  <img src={`${import.meta.env.BASE_URL}assets/images/chillan.jpg`} alt="Paisaje cordillerano de la Región de Ñuble" />
                  <div className="about-image-caption"><span>GAS EL VOLCÁN</span><strong>Cerca de las personas, todos los días.</strong></div>
                </div>
              </div>
              <div className="col-lg-6 about-copy">
                <span className="section-eyebrow">SOBRE NOSOTROS</span>
                <h2>Un servicio pensado para acompañarte.</h2>
                <p>En Gas El Volcán reunimos productos para el hogar y el negocio en un catálogo claro y fácil de recorrer. Queremos que encuentres lo que buscas de forma rápida y sencilla.</p>
                <a className="about-link" href="#productos">Conocer el catálogo <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </section>
        <section id="faq" className="faq-section">
          <div className="container">
            <div className="section-heading text-center mx-auto">
              <span className="section-eyebrow">AYUDA</span>
              <h2>Preguntas frecuentes</h2>
            </div>
            <div className="faq-list mx-auto mt-4">
              <details className="faq-item" open>
                <summary>¿Qué productos puedo encontrar?</summary>
                <p>Cilindros de distintos formatos, mangueras, reguladores y accesorios para instalaciones de gas.</p>
              </details>
              <details className="faq-item">
                <summary>¿Cómo puedo realizar un pedido?</summary>
                <p>Agrega los productos al carrito, inicia sesión con tu cuenta de cliente y completa los datos solicitados para registrar el pedido.</p>
              </details>
              <details className="faq-item">
                <summary>¿Necesito una cuenta para comprar?</summary>
                <p>Sí. Debes iniciar sesión o crear una cuenta de cliente para registrar tus pedidos y consultar tu información.</p>
              </details>
            </div>
          </div>
        </section>
        <Login user={user} loading={authLoading} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} prompt={accountPrompt} />
        <footer id="contacto" className="store-footer">
          <div className="container">
            <div className="footer-main">
              <div className="footer-brand">
                <img src={`${import.meta.env.BASE_URL}assets/images/logo.png`} alt="" />
                <div><strong>GAS EL VOLCÁN</strong><span>Energía para tu día a día</span></div>
              </div>
              <div className="footer-message"><h2>¿Buscas algo para tu hogar?</h2><p>Explora el catálogo y encuentra lo que necesitas.</p></div>
              <a className="btn btn-light footer-button" href="#productos">Ver productos <span aria-hidden="true">→</span></a>
            </div>
            <div className="footer-bottom"><span>© {new Date().getFullYear()} Gas El Volcán</span><a href="#inicio">Volver arriba ↑</a></div>
          </div>
        </footer>
      </main>
    );
  }

  return (
    <>
      <Navbar
        cartCount={count}
        user={user}
        view={view}
        onViewChange={navigate}
        onCartOpen={() => { setView("store"); setCartOpen(true); }}
        onSearch={() => { setView("store"); setSearchOpen(true); }}
        onLogout={handleLogout}
      />
      {content}
      {cartOpen && !isSeller && <Cart items={currentCart} onClose={() => setCartOpen(false)} onIncrease={(id) => changeQuantity(id, 1)} onDecrease={(id) => changeQuantity(id, -1)} onRemove={(id) => setCart((current) => current.filter((item) => item.id !== id))} onCheckout={beginCheckout} />}
      {checkoutOpen && <Checkout items={currentCart} user={user} onClose={() => setCheckoutOpen(false)} onFinish={placeOrder} />}
      {searchOpen && !isSeller && <>
        <div className="modal-backdrop show" onClick={() => { setSearchOpen(false); setQuery(""); }} />
        <SearchModal products={products} query={query} setQuery={setQuery} onAdd={addToCart} onClose={() => { setSearchOpen(false); setQuery(""); }} />
      </>}
    </>
  );
}

function App() {
  return <AuthProvider><StoreApp /></AuthProvider>;
}

createRoot(document.getElementById("root")).render(<App />);
