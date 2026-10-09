/** Datos y operaciones CRUD del catálogo. localStorage se usa como persistencia de demostración. */
export const PRODUCTS_STORAGE_KEY = "gas-volcan-products-v1";

export const PRODUCTS = [
  { id: "cilindro-5kg", name: "Cilindro Gas 5 Kg", category: "Cilindros", categoryAnchor: "cilindros", price: 6500, image: "5kg.png", description: "Compacto y liviano, perfecto para estufas pequeñas, campings o parrillas a gas.", featured: false },
  { id: "cilindro-11kg", name: "Cilindro Gas 11 Kg", category: "Cilindros", categoryAnchor: "cilindros", price: 12000, image: "11kg.png", description: "El formato estándar más usado en los hogares de Chile para cocina y agua caliente.", featured: false },
  { id: "cilindro-15kg", name: "Cilindro Gas 15 Kg", category: "Cilindros", categoryAnchor: "cilindros", price: 16000, image: "15kg.png", description: "Rendimiento superior para familias o sistemas de calefacción de alto consumo.", featured: true },
  { id: "cilindro-45kg", name: "Cilindro Gas 45 Kg", category: "Cilindros", categoryAnchor: "cilindros", price: 45000, image: "45kg.png", description: "Carga industrial para locales comerciales, pymes y consumo continuo.", featured: false },
  { id: "manguera-1-5m", name: "Manguera Gas 1.5 m", category: "Mangueras", categoryAnchor: "mangueras", price: 3990, image: "1.5m.webp", description: "Manguera flexible para conexión entre regulador y artefactos domésticos.", featured: true },
  { id: "manguera-3m", name: "Manguera Gas 3 m", category: "Mangueras", categoryAnchor: "mangueras", price: 6990, image: "3m.webp", description: "Largo extendido para instalaciones que requieren mayor distancia.", featured: false },
  { id: "abrazadera", name: "Abrazadera Metálica", category: "Mangueras", categoryAnchor: "mangueras", price: 990, image: "abrazadera.webp", description: "Ajuste firme de acero para los extremos de la manguera.", featured: false },
  { id: "kit-conexion", name: "Kit de Conexión Completo", category: "Mangueras", categoryAnchor: "mangueras", price: 12990, image: "kit.jpeg", description: "Incluye regulador doméstico, manguera de 1.5 metros y abrazaderas.", featured: false },
  { id: "regulador-estandar", name: "Regulador Estándar", category: "Reguladores", categoryAnchor: "reguladores", price: 8990, image: "regulador-estandar.png", description: "Mantiene una presión constante para artefactos domésticos.", featured: true },
  { id: "regulador-alta-presion", name: "Regulador Alta Presión", category: "Reguladores", categoryAnchor: "reguladores", price: 18990, image: "regulador-alta-presion.png", description: "Diseñado para artefactos de alto flujo térmico.", featured: false },
  { id: "regulador-dual", name: "Regulador Dual (2 salidas)", category: "Reguladores", categoryAnchor: "reguladores", price: 14990, image: "regulador-dual.png", description: "Suministra gas a dos artefactos desde una misma fuente.", featured: false },
  { id: "porta-cilindro", name: "Carro Porta Cilindro", category: "Accesorios", categoryAnchor: "accesorios", price: 12990, image: "porta-cilindro.jpg", description: "Estructura con ruedas para mover cilindros con facilidad.", featured: false },
  { id: "tapa-protectora", name: "Tapa Protectora", category: "Accesorios", categoryAnchor: "accesorios", price: 1490, image: "tapa-protectora.webp", description: "Protege la válvula de golpes, humedad y suciedad.", featured: false },
  { id: "detector-fugas", name: "Detector de Fugas", category: "Accesorios", categoryAnchor: "accesorios", price: 19990, image: "detector.jpg", description: "Sensor con alarma de alerta ante presencia de gas.", featured: true }
];

function canUseStorage() { return typeof localStorage !== "undefined"; }
export function getProducts() {
  if (!canUseStorage()) return PRODUCTS;
  try {
    const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!saved) return PRODUCTS;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : PRODUCTS;
  } catch { return PRODUCTS; }
}
export function saveProducts(products) {
  if (!Array.isArray(products)) throw new TypeError("El catálogo debe ser una lista de productos.");
  if (canUseStorage()) localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  return products;
}
export function createProduct(product) {
  const products = getProducts();
  const clean = { ...product, id: product.id || `producto-${Date.now()}`, price: Number(product.price) };
  if (!clean.name?.trim() || !clean.category?.trim() || !Number.isFinite(clean.price) || clean.price < 0) throw new Error("Nombre, categoría y precio válido son obligatorios.");
  if (products.some((item) => item.id === clean.id)) throw new Error("Ya existe un producto con ese identificador.");
  saveProducts([...products, clean]);
  return clean;
}
export function updateProduct(id, changes) {
  const products = getProducts();
  const index = products.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("No se encontró el producto.");
  const updated = { ...products[index], ...changes, id, price: Number(changes.price ?? products[index].price) };
  if (!updated.name?.trim() || !updated.category?.trim() || !Number.isFinite(updated.price) || updated.price < 0) throw new Error("Nombre, categoría y precio válido son obligatorios.");
  const next = products.map((item) => item.id === id ? updated : item);
  saveProducts(next);
  return updated;
}
export function deleteProduct(id) {
  const products = getProducts();
  const next = products.filter((item) => item.id !== id);
  saveProducts(next);
  return next;
}
export function resetProducts() { saveProducts(PRODUCTS); return PRODUCTS; }
