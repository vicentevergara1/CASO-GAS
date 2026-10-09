import React, { act } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductCatalog from "../ProductCatalog.jsx";
import Cart from "../components/Cart.jsx";
import SearchModal from "../components/SearchModal.jsx";
import Checkout from "../components/Checkout.jsx";
import { PRODUCTS } from "../data/products.js";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Gas El Volcan - pruebas unitarias", () => {
  let host, root;

  beforeEach(() => {
    host = document.createElement("div");
    document.body.appendChild(host);
  });

  afterEach(() => {
    if (root) act(() => root.unmount());
    host.remove();
  });

  const render = (C, props) => {
    root = createRoot(host);
    act(() => root.render(<C {...props} />));
  };

  it("1. Navbar renderiza El Volcan", () => {
    render(Navbar, { cartCount: 0, onCartOpen: () => {}, onSearch: () => {} });
    expect(host.textContent).toContain("El Volcan");
  });

  it("2. Navbar recibe cartCount por props", () => {
    render(Navbar, { cartCount: 3, onCartOpen: () => {}, onSearch: () => {} });
    expect(host.textContent).toContain("3");
  });

  it("3. ProductCard muestra datos recibidos por props", () => {
    render(ProductCard, { product: PRODUCTS[0], onAdd: () => {} });
    expect(host.textContent).toContain(PRODUCTS[0].name);
    expect(host.textContent).toContain("$6.500");
  });

  it("4. ProductCard ejecuta onAdd", () => {
    let called = false;
    render(ProductCard, { product: PRODUCTS[0], onAdd: () => (called = true) });
    act(() => host.querySelector("button").click());
    expect(called).toBeTrue();
  });

  it("5. ProductCatalog renderiza el catalogo", () => {
    render(ProductCatalog, { products: PRODUCTS, onAdd: () => {} });
    expect(host.querySelectorAll(".product-card").length).toBe(PRODUCTS.length);
  });

  it("6. ProductCatalog cambia su estado al seleccionar categoria", () => {
    render(ProductCatalog, { products: PRODUCTS, onAdd: () => {} });
    const button = [...host.querySelectorAll("button")].find((x) => x.textContent === "Cilindros");
    act(() => button.click());
    expect(host.querySelectorAll(".product-card").length).toBe(
        PRODUCTS.filter((p) => p.category === "Cilindros").length
    );
  });

  it("7. Cart calcula el total", () => {
    render(Cart, {
      items: [{ ...PRODUCTS[0], qty: 2 }],
      onClose: () => {},
      onIncrease: () => {},
      onDecrease: () => {},
      onRemove: () => {},
      onCheckout: () => {},
    });
    expect(host.textContent).toContain("$13.000");
    expect(host.textContent).toContain("Ir a pagar");
  });

  it("8. Checkout muestra los datos de entrega y el resumen", () => {
    render(Checkout, {
      items: [{ ...PRODUCTS[0], qty: 2 }],
      onClose: () => {},
      onFinish: () => {},
    });
    expect(host.textContent).toContain("Finalizar compra");
    expect(host.textContent).toContain("Datos de entrega");
    expect(host.textContent).toContain("$13.000");
    expect(host.textContent).toContain("Finalizar pedido");
  });

  it("9. SearchModal muestra coincidencias", () => {
    render(SearchModal, {
      products: PRODUCTS,
      query: "regulador",
      setQuery: () => {},
      onClose: () => {},
    });
    expect(host.textContent.toLowerCase()).toContain("regulador");
  });

  it("10. SearchModal informa cuando no hay resultados", () => {
    render(SearchModal, {
      products: PRODUCTS,
      query: "xyz-no-existe",
      setQuery: () => {},
      onClose: () => {},
    });
    expect(host.textContent).toContain("Sin resultados.");
  });

  it("11. SearchModal muestra imagen, precio y controles del carrito", () => {
    render(SearchModal, {
      products: PRODUCTS,
      query: "cilindro 5",
      setQuery: () => {},
      onAdd: () => {},
      onClose: () => {},
    });
    expect(host.querySelectorAll(".search-product-card").length).toBe(1);
    expect(host.querySelector(".search-product-card img").getAttribute("src")).toContain("5kg.png");
    expect(host.textContent).toContain("$6.500");
    expect(host.querySelector(".search-add-button")).not.toBeNull();
  });

  it("12. SearchModal agrega al carrito la cantidad elegida", () => {
    let selectedProduct = null;
    let selectedQuantity = 0;
    render(SearchModal, {
      products: PRODUCTS,
      query: "cilindro 5",
      setQuery: () => {},
      onAdd: (product, quantity) => {
        selectedProduct = product;
        selectedQuantity = quantity;
      },
      onClose: () => {},
    });
    const increase = host.querySelector('[aria-label="Añadir una unidad de Cilindro Gas 5 Kg"]');
    act(() => increase.click());
    act(() => increase.click());
    act(() => host.querySelector(".search-add-button").click());
    expect(selectedProduct.id).toBe(PRODUCTS[0].id);
    expect(selectedQuantity).toBe(3);
  });

  it("13. SearchModal filtra por categoría y permite volver a ver todo", () => {
    render(SearchModal, {
      products: PRODUCTS,
      query: "",
      setQuery: () => {},
      onAdd: () => {},
      onClose: () => {},
    });
    const categoryButton = [...host.querySelectorAll(".search-categories button")]
        .find((button) => button.textContent === "Reguladores");
    act(() => categoryButton.click());
    expect(host.querySelectorAll(".search-product-card").length).toBe(
        PRODUCTS.filter((product) => product.category === "Reguladores").length
    );
  });

});
