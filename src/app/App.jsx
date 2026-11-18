import { useEffect, useMemo, useState } from "react";
import StorePage from "../features/store/StorePage.jsx";
import AdminPage from "../features/admin/AdminPage.jsx";
import {
  createProduct,
  deleteProduct,
  readCart,
  readProducts,
  saveCart,
  saveProducts,
  updateProduct,
} from "../data/products.js";
import { useHashRoute } from "./router.jsx";

export default function App() {
  const route = useHashRoute();
  const [products, setProducts] = useState(readProducts);
  const [cart, setCart] = useState(() => readCart(readProducts()));

  const currentCart = useMemo(
    () => cart.flatMap((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return product ? [{ ...product, qty: item.qty }] : [];
    }),
    [cart, products]
  );
  const cartCount = useMemo(
    () => currentCart.reduce((sum, item) => sum + item.qty, 0),
    [currentCart]
  );

  useEffect(() => { saveProducts(products); }, [products]);
  useEffect(() => { saveCart(cart); }, [cart]);

  useEffect(() => {
    if (route.name === "admin") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return undefined;
    }
    if (!route.section) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return undefined;
    }
    const timer = window.setTimeout(() => {
      document.getElementById(route.section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [route.name, route.section]);

  const addToCart = (product, quantity = 1) => {
    const amount = Math.max(1, Math.floor(Number(quantity) || 1));
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + amount } : item)
        : [...current, { id: product.id, qty: amount }];
    });
  };

  const changeQuantity = (id, change) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, qty: item.qty + change } : item)
      .filter((item) => item.qty > 0));
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const saveProduct = (fields, id) => {
    const next = id ? updateProduct(products, id, fields) : createProduct(products, fields);
    if (!saveProducts(next)) {
      throw new Error("No hay espacio disponible para guardar la foto en este navegador. Intenta con otra imagen.");
    }
    setProducts(next);
  };

  const removeProduct = (id) => {
    const next = deleteProduct(products, id);
    if (!saveProducts(next)) throw new Error("No se pudo guardar el cambio en este navegador.");
    setProducts(next);
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const focusMain = (event) => {
    event.preventDefault();
    const main = document.getElementById("contenido-principal");
    main?.focus();
    main?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <a className="skip-link" href="#contenido-principal" onClick={focusMain}>
        Saltar al contenido principal
      </a>

      {route.name === "admin" ? (
        <AdminPage
          products={products}
          onSave={saveProduct}
          onDelete={removeProduct}
        />
      ) : (
        <StorePage
          products={products}
          cartItems={currentCart}
          cartCount={cartCount}
          onAddToCart={addToCart}
          onChangeQuantity={changeQuantity}
          onRemoveFromCart={removeFromCart}
          onClearCart={() => setCart([])}
        />
      )}
    </>
  );
}
