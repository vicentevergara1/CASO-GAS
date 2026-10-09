import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles.css";
import Navbar from "./components/Navbar.jsx";
import ProductCatalog from "./ProductCatalog.jsx";
import Cart from "./components/Cart.jsx";
import SearchModal from "./components/SearchModal.jsx";
import Checkout from "./components/Checkout.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Register from "./components/Register.jsx";
import Admin from "./components/Admin.jsx";
import Login from "./Login.jsx";
import { getProducts } from "./data/products.js";
import { readStorage, writeStorage, STORAGE_KEYS } from "./data/persistence.js";

function App() {
  const [products, setProducts] = useState(() => getProducts());
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.cart, []));
  const [orders, setOrders] = useState(() => readStorage(STORAGE_KEYS.orders, []));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [detailProduct, setDetailProduct] = useState(null);
  const count = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  useEffect(() => { writeStorage(STORAGE_KEYS.cart, cart); }, [cart]);
  useEffect(() => { writeStorage(STORAGE_KEYS.orders, orders); }, [orders]);

  const add = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };
  const changeQty = (id, delta) => setCart((current) => current.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const refreshProducts = () => setProducts(getProducts());
  const finishOrder = (order) => {
    if (order) {
      const updatedOrders = [order, ...readStorage(STORAGE_KEYS.orders, [])];
      writeStorage(STORAGE_KEYS.orders, updatedOrders);
      setOrders(updatedOrders);
      window.dispatchEvent(new Event("gas-volcan-data-updated"));
    }
    setCheckoutOpen(false);
    setCart([]);
  };

  return <>
    <Navbar cartCount={count} onCartOpen={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
    <main id="inicio" style={{ paddingTop: 70 }}>
      <section className="hero py-5"><div className="container py-5"><div className="row align-items-center g-4"><div className="col-lg-7"><span className="badge text-bg-info mb-3">Gas El Volcán</span><h1 className="display-4 fw-bold">Gas para tu hogar, con servicio cercano y confiable.</h1><p className="lead text-secondary">Compra cilindros, accesorios y soluciones para gas de manera simple.</p><a className="btn btn-primary btn-lg" href="#productos">Ver productos</a> <a className="btn btn-outline-primary btn-lg mt-2 mt-sm-0" href="#ofertas">Ver ofertas</a></div><div className="col-lg-5 text-center"><img src={`${import.meta.env.BASE_URL}assets/images/volcan.png`} className="img-fluid hero-image" alt="Gas El Volcán" /></div></div></div></section>
      <ProductCatalog products={products} onAdd={add} onDetail={setDetailProduct} />
      <ProductCatalog products={products} onAdd={add} onDetail={setDetailProduct} offersOnly />
      <section id="servicios" className="py-5"><div className="container"><h2 className="fw-bold">Nuestros servicios</h2><div className="row g-4 mt-1">{[["Venta de cilindros","Formatos para distintos niveles de consumo."],["Accesorios","Mangueras, reguladores y productos complementarios."],["Atención al cliente","Orientación para elegir la alternativa adecuada."]].map(([title,description])=><div className="col-12 col-md-4" key={title}><div className="card h-100 shadow-sm border-0"><div className="card-body"><h3 className="h5">{title}</h3><p>{description}</p></div></div></div>)}</div></div></section>
      <section id="nosotros" className="py-5 bg-light"><div className="container"><h2>Sobre Gas El Volcán</h2><p className="text-secondary">Propuesta digital para facilitar la consulta y compra de productos de gas.</p></div></section>
      <section id="faq" className="py-5"><div className="container"><h2>Preguntas frecuentes</h2><div className="accordion mt-3" id="faq-accordion"><div className="accordion-item"><h3 className="accordion-header"><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq-products">¿Qué productos puedo encontrar?</button></h3><div id="faq-products" className="accordion-collapse collapse show" data-bs-parent="#faq-accordion"><div className="accordion-body">Cilindros, mangueras, reguladores y accesorios.</div></div></div><div className="accordion-item"><h3 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-pay">¿El pago es real?</button></h3><div id="faq-pay" className="accordion-collapse collapse" data-bs-parent="#faq-accordion"><div className="accordion-body">No. El checkout es una simulación académica; no procesa pagos bancarios reales.</div></div></div></div></div></section>
      <Login />
      <Register />
      <Admin products={products} onProductsChange={refreshProducts} />
      <section id="contacto" className="py-5 bg-dark text-white"><div className="container"><h2>Contacto</h2><p>Gas El Volcán — atención y productos para tu hogar.</p><a className="link-light" href="#inicio">Volver al inicio</a></div></section>
    </main>
    <footer className="py-3 bg-dark text-white-50 text-center"><small>© {new Date().getFullYear()} Gas El Volcán · Proyecto académico</small></footer>
    {cartOpen && <Cart items={cart} onClose={() => setCartOpen(false)} onIncrease={(id) => changeQty(id, 1)} onDecrease={(id) => changeQty(id, -1)} onRemove={(id) => setCart((current) => current.filter((item) => item.id !== id))} onCheckout={() => { if (cart.length) { setCartOpen(false); setCheckoutOpen(true); } }} />}
    {checkoutOpen && <Checkout items={cart} onClose={() => setCheckoutOpen(false)} onFinish={finishOrder} />}
    {searchOpen && <><div className="modal-backdrop show" onClick={() => setSearchOpen(false)} /><SearchModal products={products} query={query} setQuery={setQuery} onClose={() => { setSearchOpen(false); setQuery(""); }} /></>}
    {detailProduct && <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} onAdd={add} />}
  </>;
}

createRoot(document.getElementById("root")).render(<App />);
