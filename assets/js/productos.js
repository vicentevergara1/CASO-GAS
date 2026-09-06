// Catálogo único de productos. Todas las páginas (index.html y pages/productos.html)
// leen de aquí, así el buscador y el carrito funcionan igual en cualquier página
// y no hay precios/nombres duplicados que se desincronicen.

const PRODUCTS = [
  // Cilindros
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

  // Mangueras y conexiones
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

  // Reguladores
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

  // Accesorios
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
