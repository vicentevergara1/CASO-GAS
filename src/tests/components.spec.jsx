import React, { act } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductCatalog from "../ProductCatalog.jsx";
import Cart from "../components/Cart.jsx";
import SearchModal from "../components/SearchModal.jsx";
import Checkout from "../components/Checkout.jsx";
import { PRODUCTS, PRODUCTS_STORAGE_KEY, getProducts, createProduct, updateProduct, deleteProduct, resetProducts } from "../data/products.js";
import { readStorage, writeStorage } from "../data/persistence.js";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Gas El Volcán — pruebas unitarias", () => {
  let host, root;
  beforeEach(() => { host = document.createElement("div"); document.body.appendChild(host); });
  afterEach(() => { if (root) act(() => root.unmount()); host.remove(); root = null; localStorage.removeItem(PRODUCTS_STORAGE_KEY); });
  const render = (Component, props) => { root = createRoot(host); act(() => root.render(<Component {...props} />)); };

  it("1. Navbar muestra el nombre de la tienda", () => {
    render(Navbar, { cartCount: 0, onCartOpen: () => {}, onSearch: () => {} });
    expect(host.textContent).toContain("El Volcán");
  });
  it("2. Navbar recibe el contador mediante props", () => {
    render(Navbar, { cartCount: 3, onCartOpen: () => {}, onSearch: () => {} });
    expect(host.textContent).toContain("3");
  });
  it("3. ProductCard muestra nombre y precio del producto", () => {
    render(ProductCard, { product: PRODUCTS[0], onAdd: () => {}, onDetail: () => {} });
    expect(host.textContent).toContain(PRODUCTS[0].name);
    expect(host.textContent).toContain("6.500");
  });
  it("4. ProductCard ejecuta el spy al agregar", () => {
    const onAdd = jasmine.createSpy("onAdd");
    render(ProductCard, { product: PRODUCTS[0], onAdd, onDetail: () => {} });
    act(() => host.querySelector('[aria-label^="Agregar"]').click());
    expect(onAdd).toHaveBeenCalledOnceWith(PRODUCTS[0]);
  });
  it("5. ProductCatalog muestra todos los productos", () => {
    render(ProductCatalog, { products: PRODUCTS, onAdd: () => {}, onDetail: () => {} });
    expect(host.querySelectorAll(".product-card").length).toBe(PRODUCTS.length);
  });
  it("6. ProductCatalog filtra por categoría al hacer clic", () => {
    render(ProductCatalog, { products: PRODUCTS, onAdd: () => {}, onDetail: () => {} });
    const button = [...host.querySelectorAll("button")].find((element) => element.textContent === "Cilindros");
    act(() => button.click());
    expect(host.querySelectorAll(".product-card").length).toBe(PRODUCTS.filter((p) => p.category === "Cilindros").length);
  });
  it("7. Cart calcula el total de los artículos", () => {
    render(Cart, { items: [{ ...PRODUCTS[0], qty: 2 }], onClose: () => {}, onIncrease: () => {}, onDecrease: () => {}, onRemove: () => {}, onCheckout: () => {} });
    expect(host.textContent).toContain("13.000");
    expect(host.textContent).toContain("Ir a pagar");
  });
  it("8. Cart ejecuta el spy para eliminar un producto", () => {
    const onRemove = jasmine.createSpy("onRemove");
    render(Cart, { items: [{ ...PRODUCTS[0], qty: 1 }], onClose: () => {}, onIncrease: () => {}, onDecrease: () => {}, onRemove, onCheckout: () => {} });
    act(() => [...host.querySelectorAll("button")].find((button) => button.textContent === "Eliminar").click());
    expect(onRemove).toHaveBeenCalledOnceWith(PRODUCTS[0].id);
  });
  it("9. SearchModal muestra coincidencias de búsqueda", () => {
    render(SearchModal, { products: PRODUCTS, query: "regulador", setQuery: () => {}, onClose: () => {} });
    expect(host.textContent.toLowerCase()).toContain("regulador");
  });
  it("10. SearchModal muestra estado vacío si no hay coincidencias", () => {
    render(SearchModal, { products: PRODUCTS, query: "xyz-no-existe", setQuery: () => {}, onClose: () => {} });
    expect(host.textContent).toContain("Sin resultados.");
  });
  it("11. Checkout muestra resumen y datos de entrega", () => {
    render(Checkout, { items: [{ ...PRODUCTS[0], qty: 2 }], onClose: () => {}, onFinish: () => {} });
    expect(host.textContent).toContain("Finalizar compra");
    expect(host.textContent).toContain("Datos de entrega");
    expect(host.textContent).toContain("13.000");
  });
  it("12. Checkout muestra error condicional si se intenta enviar vacío", () => {
    render(Checkout, { items: [{ ...PRODUCTS[0], qty: 1 }], onClose: () => {}, onFinish: () => {} });
    const form = host.querySelector("form");
    act(() => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
    expect(host.textContent).toContain("Completa todos los datos de entrega.");
    expect(host.querySelector('[role="alert"]')).not.toBeNull();
  });
  it("13. CRUD crea, consulta, actualiza y elimina productos", () => {
    const created = createProduct({ id: "test-product", name: "Producto de prueba", category: "Accesorios", price: 1000, image: "5kg.png", description: "Prueba", featured: false });
    expect(getProducts().some((p) => p.id === created.id)).toBeTrue();
    updateProduct(created.id, { name: "Producto actualizado", price: 1500 });
    expect(getProducts().find((p) => p.id === created.id).name).toBe("Producto actualizado");
    deleteProduct(created.id);
    expect(getProducts().some((p) => p.id === created.id)).toBeFalse();
  });
  it("14. CRUD rechaza productos con datos obligatorios inválidos", () => {
    expect(() => createProduct({ id: "invalid", name: "", category: "Accesorios", price: -1 })).toThrowError();
  });
  it("15. Helpers guardan y recuperan datos desde localStorage", () => {
    expect(writeStorage("test-storage", { status: "ok" })).toBeTrue();
    expect(readStorage("test-storage", {})).toEqual({ status: "ok" });
    localStorage.removeItem("test-storage");
  });
});
