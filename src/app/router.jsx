import { useEffect, useState } from "react";

export const STORE_PATH = "#/";
export const ADMIN_PATH = "#/admin";

/**
 * Router mínimo basado en hash. Se eligió hash para que la tienda funcione
 * al recargar en GitHub Pages sin configurar reglas de servidor.
 *
 * Rutas:
 *   #/            -> tienda pública
 *   #/admin       -> panel administrativo (acceso directo por URL)
 *   #productos    -> tienda + sección del catálogo
 */
export function parseRoute(hash = "") {
  const raw = String(hash).replace(/^#/, "");
  if (raw === "/admin" || raw.startsWith("/admin/")) {
    return { name: "admin", section: null };
  }
  if (raw.startsWith("/")) {
    return { name: "store", section: raw.replace(/^\/+/, "") || null };
  }
  return { name: "store", section: raw || null };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

  useEffect(() => {
    const handleChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", handleChange);
    return () => window.removeEventListener("hashchange", handleChange);
  }, []);

  return route;
}
