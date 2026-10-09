
const PRODUCTS = [
  {
    id: "cilindro-5kg",
    name: "Cilindro Gas 5 Kg",
    category: "Cilindros",
    categoryAnchor: "cilindros",
    price: 6500,
    image: "5kg.png",
    description:
      "Compacto y liviano, perfecto para estufas pequeñas, campings o parrillas a gas.",
    featured: false,
  },
  {
    id: "cilindro-11kg",
    name: "Cilindro Gas 11 Kg",
    category: "Cilindros",
    categoryAnchor: "cilindros",
    price: 12000,
    image: "11kg.png",
    description:
      "El formato estándar más usado en los hogares de Chile para cocina y agua caliente.",
    featured: false,
  },
  {
    id: "cilindro-15kg",
    name: "Cilindro Gas 15 Kg",
    category: "Cilindros",
    categoryAnchor: "cilindros",
    price: 16000,
    image: "15kg.png",
    description:
      "Rendimiento superior para familias o sistemas de calefacción de alto consumo.",
    featured: true,
  },
  {
    id: "cilindro-45kg",
    name: "Cilindro Gas 45 Kg",
    category: "Cilindros",
    categoryAnchor: "cilindros",
    price: 45000,
    image: "45kg.png",
    description:
      "Carga industrial para locales comerciales, pymes y consumo continuo.",
    featured: false,
  },

  {
    id: "manguera-1-5m",
    name: "Manguera Gas 1.5 m",
    category: "Mangueras",
    categoryAnchor: "mangueras",
    price: 3990,
    image: "1.5m.webp",
    description:
      "Manguera flexible certificada para conexión directa entre regulador y artefactos domésticos.",
    featured: true,
  },
  {
    id: "manguera-3m",
    name: "Manguera Gas 3 m",
    category: "Mangueras",
    categoryAnchor: "mangueras",
    price: 6990,
    image: "3m.webp",
    description:
      "Largo extendido ideal para instalaciones que requieren mayor distancia del cilindro.",
    featured: false,
  },
  {
    id: "abrazadera",
    name: "Abrazadera Metálica",
    category: "Mangueras",
    categoryAnchor: "mangueras",
    price: 990,
    image: "abrazadera.webp",
    description:
      "Ajuste seguro y firme de acero para prevenir fugas en los extremos de la manguera.",
    featured: false,
  },
  {
    id: "kit-conexion",
    name: "Kit de Conexión Completo",
    category: "Mangueras",
    categoryAnchor: "mangueras",
    price: 12990,
    image: "kit.jpeg",
    description:
      "Incluye regulador doméstico, manguera de 1.5 metros y 2 abrazaderas metálicas.",
    featured: false,
  },

  {
    id: "regulador-estandar",
    name: "Regulador Estándar",
    category: "Reguladores",
    categoryAnchor: "reguladores",
    price: 8990,
    image: "regulador-estandar.png",
    description:
      "Mantiene una presión constante para el uso seguro de cocinas y calefonts de casa.",
    featured: true,
  },
  {
    id: "regulador-alta-presion",
    name: "Regulador Alta Presión",
    category: "Reguladores",
    categoryAnchor: "reguladores",
    price: 18990,
    image: "regulador-alta-presion.png",
    description:
      "Diseñado para cocinillas industriales, sopletes y artefactos de alto flujo térmico.",
    featured: false,
  },
  {
    id: "regulador-dual",
    name: "Regulador Dual (2 salidas)",
    category: "Reguladores",
    categoryAnchor: "reguladores",
    price: 14990,
    image: "regulador-dual.png",
    description:
      "Suministra gas a dos artefactos simultáneamente desde la misma fuente de cilindro.",
    featured: false,
  },

  {
    id: "porta-cilindro",
    name: "Carro Porta Cilindro",
    category: "Accesorios",
    categoryAnchor: "accesorios",
    price: 12990,
    image: "porta-cilindro.jpg",
    description:
      "Estructura metálica resistente con ruedas para mover cilindros de 11 y 15 kg con facilidad.",
    featured: false,
  },
  {
    id: "tapa-protectora",
    name: "Tapa Protectora",
    category: "Accesorios",
    categoryAnchor: "accesorios",
    price: 1490,
    image: "tapa-protectora.webp",
    description:
      "Protege la válvula del cilindro de golpes, humedad y suciedad durante su almacenamiento.",
    featured: false,
  },
  {
    id: "detector-fugas",
    name: "Detector de Fugas",
    category: "Accesorios",
    categoryAnchor: "accesorios",
    price: 19990,
    image: "detector.jpg",
    description:
      "Sensor inteligente con alarma audible de alerta rápida ante cualquier presencia de gas licuado.",
    featured: true,
  },
];

export { PRODUCTS };

export const PRODUCTS_STORAGE_KEY = "gas-el-volcan-products-v2";
export const CART_STORAGE_KEY = "gas-el-volcan-cart-v2";

const categoryAnchors = {
  Cilindros: "cilindros",
  Mangueras: "mangueras",
  Reguladores: "reguladores",
  Accesorios: "accesorios",
};

function validProduct(product) {
  return product && typeof product.id === "string" && product.id.length > 0 &&
    typeof product.name === "string" && product.name.trim().length > 0 &&
    typeof product.category === "string" && Object.hasOwn(categoryAnchors, product.category) &&
    Number.isFinite(product.price) && product.price > 0 &&
    typeof product.image === "string" && product.image.length > 0 &&
    typeof product.description === "string";
}

function localStore() {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

export function readProducts(storage = localStore()) {
  try {
    const saved = storage?.getItem(PRODUCTS_STORAGE_KEY);
    if (saved === null || saved === undefined) return PRODUCTS.map((product) => ({ ...product }));
    const products = JSON.parse(saved);
    if (!Array.isArray(products) || !products.every(validProduct)) throw new Error("Catálogo inválido");
    if (new Set(products.map((product) => product.id)).size !== products.length) throw new Error("IDs repetidos");
    return products;
  } catch {
    return PRODUCTS.map((product) => ({ ...product }));
  }
}

export function saveProducts(products, storage = localStore()) {
  try {
    storage?.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    return Boolean(storage);
  } catch {
    return false;
  }
}

function fieldsForProduct(fields) {
  const name = String(fields.name ?? "").trim();
  const description = String(fields.description ?? "").trim();
  const category = String(fields.category ?? "");
  const image = String(fields.image ?? "");
  const price = Number(fields.price);
  if (!name || !description || !categoryAnchors[category] || !image || !Number.isSafeInteger(price) || price <= 0) {
    throw new Error("Completa nombre, categoría, precio válido, imagen y descripción.");
  }
  return { name, description, category, categoryAnchor: categoryAnchors[category], image, price, featured: Boolean(fields.featured) };
}

export function createProduct(products, fields) {
  const product = {
    id: `producto-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    ...fieldsForProduct(fields),
  };
  return [...products, product];
}

export function getProductById(products, id) {
  return products.find((product) => product.id === id) ?? null;
}

export function updateProduct(products, id, fields) {
  if (!getProductById(products, id)) throw new Error("El producto no existe.");
  const changes = fieldsForProduct(fields);
  return products.map((product) => product.id === id ? { ...product, ...changes } : product);
}

export function deleteProduct(products, id) {
  if (!getProductById(products, id)) throw new Error("El producto no existe.");
  return products.filter((product) => product.id !== id);
}

export function readCart(products, storage = localStore()) {
  try {
    const saved = storage?.getItem(CART_STORAGE_KEY);
    if (!saved) return [];
    const entries = JSON.parse(saved);
    if (!Array.isArray(entries)) return [];
    const quantities = new Map();
    for (const item of entries) {
      if (item && typeof item.id === "string" && Number.isSafeInteger(item.qty) && item.qty > 0 && getProductById(products, item.id)) {
        quantities.set(item.id, (quantities.get(item.id) || 0) + item.qty);
      }
    }
    return [...quantities].map(([id, qty]) => ({ id, qty }));
  } catch {
    return [];
  }
}

export function saveCart(cart, storage = localStore()) {
  try {
    storage?.setItem(CART_STORAGE_KEY, JSON.stringify(cart.map(({ id, qty }) => ({ id, qty }))));
    return Boolean(storage);
  } catch {
    return false;
  }
}
