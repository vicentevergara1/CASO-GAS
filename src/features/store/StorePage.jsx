import { useState } from "react";
import StoreNavbar from "./components/StoreNavbar.jsx";
import Hero from "./components/Hero.jsx";
import ProductCatalog from "./components/ProductCatalog.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import LoginSection from "../auth/LoginSection.jsx";
import CartDrawer from "../cart/CartDrawer.jsx";
import CheckoutDialog from "../checkout/CheckoutDialog.jsx";
import SearchModal from "../search/SearchModal.jsx";

export default function StorePage({
  products,
  cartItems,
  cartCount,
  onAddToCart,
  onChangeQuantity,
  onRemoveFromCart,
  onClearCart,
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openCart = () => {
    setSearchOpen(false);
    setCartOpen(true);
  };

  const openSearch = () => {
    setCartOpen(false);
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const add = (product, quantity = 1) => {
    onAddToCart(product, quantity);
    closeSearch();
    setCartOpen(true);
  };

  const startCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="store-shell">
      <StoreNavbar
        cartCount={cartCount}
        onCartOpen={openCart}
        onSearch={openSearch}
      />

      <main id="contenido-principal" tabIndex="-1">
        <Hero onSearch={openSearch} />
        <ProductCatalog products={products} onAdd={add} />
        <Services />
        <About />
        <Faq />
        <LoginSection />
      </main>
      <Contact />

      {cartOpen && (
        <CartDrawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onIncrease={(id) => onChangeQuantity(id, 1)}
          onDecrease={(id) => onChangeQuantity(id, -1)}
          onRemove={onRemoveFromCart}
          onCheckout={startCheckout}
        />
      )}

      {checkoutOpen && (
        <CheckoutDialog
          items={cartItems}
          onClose={() => setCheckoutOpen(false)}
          onFinish={() => {
            setCheckoutOpen(false);
            onClearCart();
          }}
        />
      )}

      {searchOpen && (
        <SearchModal
          products={products}
          query={query}
          setQuery={setQuery}
          onAdd={add}
          onClose={closeSearch}
        />
      )}
    </div>
  );
}
