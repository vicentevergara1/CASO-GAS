/** Helpers pequeños para persistir estado de demostración en el navegador. */
export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}
export function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
export const STORAGE_KEYS = {
  cart: "gas-volcan-cart-v1",
  users: "gas-volcan-users-v1",
  orders: "gas-volcan-orders-v1"
};
