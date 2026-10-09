import React, { act } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductCatalog from "../ProductCatalog.jsx";
import Cart from "../components/Cart.jsx";
import SearchModal from "../components/SearchModal.jsx";
import Checkout from "../components/Checkout.jsx";
import {
  PRODUCTS, PRODUCTS_STORAGE_KEY, CART_STORAGE_KEY,
  createProduct, deleteProduct, getProductById, readCart, readProducts,
  saveCart, saveProducts, updateProduct,
} from "../data/products.js";
import Admin from "../components/Admin.jsx";

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


  const storage = () => {
    const data = new Map();
    return {
      getItem: (key) => data.has(key) ? data.get(key) : null,
      setItem: (key, value) => data.set(key, value),
    };
  };

  it("14. La lectura del catálogo usa los productos iniciales sin datos guardados", () => {
    const products = readProducts(storage());
    expect(products.length).toBe(PRODUCTS.length);
    expect(products).not.toBe(PRODUCTS);
  });

  it("15. CRUD crea un producto con identificador único", () => {
    const next = createProduct(PRODUCTS, {
      name: "Accesorio de prueba", category: "Accesorios", price: 5500,
      image: "detector.jpg", description: "Producto para una prueba", featured: false,
    });
    expect(next.length).toBe(PRODUCTS.length + 1);
    expect(next[next.length - 1].name).toBe("Accesorio de prueba");
    expect(getProductById(next, next[next.length - 1].id)).not.toBeNull();
    expect(PRODUCTS.length).toBe(14);
  });

  it("16. CRUD actualiza el precio sin modificar el producto original", () => {
    const next = updateProduct(PRODUCTS, PRODUCTS[0].id, { ...PRODUCTS[0], price: 7800 });
    expect(next[0].price).toBe(7800);
    expect(PRODUCTS[0].price).toBe(6500);
  });

  it("17. CRUD elimina un producto por ID", () => {
    const next = deleteProduct(PRODUCTS, PRODUCTS[0].id);
    expect(next.length).toBe(PRODUCTS.length - 1);
    expect(getProductById(next, PRODUCTS[0].id)).toBeNull();
  });

  it("18. CRUD rechaza productos con precios inválidos", () => {
    expect(() => createProduct(PRODUCTS, { ...PRODUCTS[0], price: -1 })).toThrow();
  });

  it("19. Persistencia guarda y recupera el catálogo modificado", () => {
    const store = storage();
    const next = updateProduct(PRODUCTS, PRODUCTS[0].id, { ...PRODUCTS[0], price: 9000 });
    expect(saveProducts(next, store)).toBeTrue();
    expect(store.getItem(PRODUCTS_STORAGE_KEY)).toContain("9000");
    expect(readProducts(store)[0].price).toBe(9000);
  });

  it("20. Persistencia conserva la cantidad del carrito", () => {
    const store = storage();
    expect(saveCart([{ id: PRODUCTS[0].id, qty: 3 }], store)).toBeTrue();
    expect(store.getItem(CART_STORAGE_KEY)).toContain("qty");
    expect(readCart(PRODUCTS, store)).toEqual([{ id: PRODUCTS[0].id, qty: 3 }]);
  });

  it("21. El carrito ignora productos eliminados del catálogo", () => {
    const store = storage();
    saveCart([{ id: PRODUCTS[0].id, qty: 1 }, { id: "no-existe", qty: 5 }], store);
    expect(readCart(PRODUCTS, store)).toEqual([{ id: PRODUCTS[0].id, qty: 1 }]);
  });

  it("22. El panel de administración permite seleccionar un producto para editar", () => {
    render(Admin, { products: PRODUCTS, onSave: () => {}, onDelete: () => {}, onClose: () => {} });
    expect(host.textContent).toContain("Administración del catálogo");
    expect(host.textContent).toContain(PRODUCTS[0].name);
    act(() => host.querySelector(".admin-list-item button").click());
    expect(host.querySelector("#admin-name").value).toBe(PRODUCTS[0].name);
    expect(host.querySelector("#admin-price").value).toBe(String(PRODUCTS[0].price));
  });

  it("23. Checkout contiene un flujo demostrativo de pago fallido", () => {
    render(Checkout, {
      items: [{ ...PRODUCTS[0], qty: 1 }], onClose: () => {}, onFinish: () => {},
    });
    const failButton = [...host.querySelectorAll("button")].find((button) => button.textContent === "Simular pago fallido");
    expect(failButton).not.toBeUndefined();
    act(() => failButton.click());
    expect(host.textContent).toContain("Completa todos los datos de entrega.");
  });

});
