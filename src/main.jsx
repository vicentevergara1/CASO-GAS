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
      // La sesión local se limpia aunque el backend no responda.
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
      : <main id="inicio" style={{ paddingTop: 70 }}>
          <section className="py-4 bg-light border-bottom">
            <div className="container"><span className="badge text-bg-info mb-2">Vista de vendedor</span><h1 className="h2 fw-bold mb-1">Productos</h1><p className="text-secondary mb-0">Consulta el catálogo y el detalle de cada producto.</p></div>
          </section>
          {catalog}
        </main>;
  } else if (view === "admin" && isAdmin) {
    content = <main style={{ paddingTop: 70 }}><Admin products={products} categories={categories} onSave={saveProduct} onDelete={removeProduct} onClose={() => navigate("store")} /></main>;
  } else if (view === "orders" && isAdmin) {
    content = <main style={{ paddingTop: 70 }}><OrdersPanel onBack={() => navigate("store")} /></main>;
  } else {
    content = (
      <main id="inicio" style={{ paddingTop: 70 }}>
        <section className="hero py-5">
          <div className="container py-5">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <span className="badge text-bg-info mb-3">Gas El Volcán</span>
                <h1 className="display-4 fw-bold">Gas para tu hogar, con servicio cercano y confiable.</h1>
                <p className="lead text-secondary">Compra cilindros, accesorios y soluciones para gas de manera simple.</p>
                <a className="btn btn-primary btn-lg" href="#productos">Ver productos</a>
              </div>
              <div className="col-lg-5 text-center"><img src={`${import.meta.env.BASE_URL}assets/images/volcan.png`} className="img-fluid" alt="Gas El Volcán" /></div>
            </div>
          </div>
        </section>
        {catalog}
        <section id="servicios" className="py-5">
          <div className="container">
            <h2 className="fw-bold">Nuestros servicios</h2>
            <div className="row g-4 mt-1">
              {[["Venta de cilindros", "Formatos para distintos niveles de consumo."], ["Accesorios", "Mangueras, reguladores y productos complementarios."], ["Atención al cliente", "Orientación para elegir la alternativa adecuada."]].map(([title, text]) => (
                <div className="col-12 col-md-4" key={title}><div className="card h-100 shadow-sm border-0"><div className="card-body"><h3 className="h5">{title}</h3><p>{text}</p></div></div></div>
              ))}
            </div>
          </div>
        </section>
        <section id="nosotros" className="py-5 bg-light"><div className="container"><h2>Sobre Gas El Volcán</h2><p className="text-secondary">Propuesta digital para facilitar la consulta y compra de productos de gas.</p></div></section>
        <section id="faq" className="py-5"><div className="container"><h2>Preguntas frecuentes</h2><div className="accordion mt-3"><div className="accordion-item"><h3 className="accordion-header"><button className="accordion-button" type="button">¿Qué productos puedo encontrar?</button></h3><div className="accordion-body">Cilindros, mangueras, reguladores y accesorios.</div></div></div></div></section>
        <Login user={user} loading={authLoading} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} prompt={accountPrompt} />
        <section id="contacto" className="py-5 bg-dark text-white"><div className="container"><h2>Contacto</h2><p>Gas El Volcán - Atención y productos para tu hogar.</p></div></section>
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
