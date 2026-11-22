import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readProductionApiUrl } from "./validar-api-publica.mjs";

function withConfig(value, callback) {
  const folder = mkdtempSync(join(tmpdir(), "gas-api-config-"));
  try {
    const filename = join(folder, ".env.production");
    writeFileSync(filename, `VITE_API_BASE_URL=${value}\n`);
    callback(filename);
  } finally { rmSync(folder, { recursive: true, force: true }); }
}

test("acepta un origen HTTPS sin ruta", () => {
  withConfig("https://54.242.154.29.nip.io", filename => {
    assert.equal(readProductionApiUrl(filename), "https://54.242.154.29.nip.io");
  });
});
for (const value of ["http://localhost:8080", "https://host.cl/api", "https://host.cl/", "http://host.cl", "no-es-url"]) {
  test(`rechaza dirección inadecuada: ${value}`, () => {
    withConfig(value, filename => assert.throws(() => readProductionApiUrl(filename)));
  });
}

// Pruebas sin acceso a Internet para la validación del despliegue.
test("preflight y dos GET correctos permiten publicar", async () => {
  const { validatePublicApi } = await import("./validar-api-publica.mjs");
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, method: options.method || "GET" });
    const headers = {
      "Access-Control-Allow-Origin": "https://vicentevergara1.github.io",
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
    };
    if (options.method === "OPTIONS") return new Response(null, { status: 200, headers });
    if (url.endsWith("/api/v1/products")) return Response.json([{ id: "GAS-1", name: "Cilindro" }], { headers });
    return Response.json([{ id: 1, name: "Cilindros" }], { headers });
  };
  try {
    const result = await validatePublicApi("https://54.242.154.29.nip.io");
    assert.deepEqual(result, { products: 1, categories: 1 });
    assert.equal(calls.length, 3);
    assert.deepEqual(calls.map(c => c.method), ["GET", "GET", "OPTIONS"]);
  } finally { globalThis.fetch = originalFetch; }
});

test("CORS incorrecto detiene publicación antes de compilar", async () => {
  const { validatePublicApi } = await import("./validar-api-publica.mjs");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json([{ id: "1", name: "Cilindro" }]);
  try {
    await assert.rejects(validatePublicApi("https://54.242.154.29.nip.io"), /CORS no permite/);
  } finally { globalThis.fetch = originalFetch; }
});
