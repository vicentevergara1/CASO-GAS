import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { readProductionApiUrl } from "./validar-api-publica.mjs";

const apiBase = readProductionApiUrl();
const assetPath = "dist/assets";
const jsFiles = readdirSync(assetPath).filter(name => name.endsWith(".js"));
if (!jsFiles.length) throw new Error("No se encontraron archivos JavaScript compilados en dist/assets.");
const content = jsFiles.map(name => readFileSync(join(assetPath, name), "utf8")).join("\n");
if (!content.includes(apiBase)) throw new Error(`El build NO contiene la URL esperada ${apiBase}.`);
for (const oldHost of ["3.80.86.195.nip.io", "13.220.133.191.nip.io"]) {
  if (content.includes(oldHost)) throw new Error(`El build contiene una IP obsoleta: ${oldHost}.`);
}
console.log(`Build correcto: apunta a ${apiBase} y no contiene los hosts obsoletos conocidos.`);
