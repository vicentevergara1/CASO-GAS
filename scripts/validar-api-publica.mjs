/** Verificación anterior al build de GitHub Pages. No requiere credenciales. */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const FRONTEND_ORIGIN = "https://vicentevergara1.github.io";

export function readProductionApiUrl(file = ".env.production") {
  const config = readFileSync(file, "utf8");
  const values = config.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#") && line.startsWith("VITE_API_BASE_URL="));
  if (values.length !== 1) throw new Error(`Se requiere una única VITE_API_BASE_URL en ${file}.`);
  const raw = values[0].slice("VITE_API_BASE_URL=".length).trim();
  let url;
  try { url = new URL(raw); } catch { throw new Error("VITE_API_BASE_URL no es una URL válida."); }
  if (url.protocol !== "https:" || !url.hostname || url.username || url.password ||
      url.port || url.pathname !== "/" || url.search || url.hash || raw.endsWith("/")) {
    throw new Error("VITE_API_BASE_URL debe ser un origen HTTPS público sin /api, ruta ni barra final.");
  }
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "0.0.0.0" ||
      url.hostname.endsWith(".local")) {
    throw new Error("VITE_API_BASE_URL no puede apuntar a un host local.");
  }
  return url.origin;
}

async function getJson(apiBase, path) {
  const response = await fetch(apiBase + path, {
    headers: { Origin: FRONTEND_ORIGIN, Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  if (response.headers.get("access-control-allow-origin") !== FRONTEND_ORIGIN ||
      response.headers.get("access-control-allow-credentials")?.toLowerCase() !== "true") {
    throw new Error(`${path}: CORS no permite ${FRONTEND_ORIGIN} con credenciales.`);
  }
  const type = response.headers.get("content-type") || "";
  if (!type.includes("json")) throw new Error(`${path}: respuesta no es JSON (${type}).`);
  return response.json();
}

export async function validatePublicApi(apiBase = readProductionApiUrl()) {
  const products = await getJson(apiBase, "/api/v1/products");
  if (!Array.isArray(products) || !products.length || !products.every(p => p && p.id && p.name)) {
    throw new Error("Productos: se esperaba un arreglo JSON con id y nombre.");
  }
  const categories = await getJson(apiBase, "/api/v1/categories");
  if (!Array.isArray(categories) || !categories.length) {
    throw new Error("Categorías: se esperaba un arreglo JSON con elementos.");
  }
  const preflight = await fetch(`${apiBase}/api/v1/products`, {
    method: "OPTIONS",
    headers: {
      Origin: FRONTEND_ORIGIN,
      "Access-Control-Request-Method": "GET",
      "Access-Control-Request-Headers": "authorization,content-type",
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!preflight.ok || preflight.headers.get("access-control-allow-origin") !== FRONTEND_ORIGIN) {
    throw new Error(`Preflight CORS: HTTP ${preflight.status}, origen no autorizado.`);
  }
  console.log(`API validada: ${apiBase} | ${products.length} productos | ${categories.length} categorías | CORS OK`);
  return { products: products.length, categories: categories.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  validatePublicApi().catch(error => {
    console.error(`::error::No se publicará una compilación con API inalcanzable o CORS incorrecto: ${error.message}`);
    process.exitCode = 1;
  });
}
