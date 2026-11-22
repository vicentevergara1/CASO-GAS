const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/+$/, "");

let accessToken = null;
let refreshPromise = null;
let unauthorizedHandler = null;

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function setAccessToken(token) {
  accessToken = token || null;
}

export function clearAccessToken() {
  accessToken = null;
}

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

function messageFromBody(body, fallback) {
  if (typeof body === "string" && body.trim()) return body;
  return body?.detail || body?.error || body?.message || fallback;
}

async function readBody(response) {
  if (response.status === 204) return null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }
  const text = await response.text().catch(() => "");
  return text || null;
}

export async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        clearAccessToken();
        return null;
      }
      const session = await readBody(response);
      if (!session?.accessToken || !session?.user) {
        clearAccessToken();
        return null;
      }
      setAccessToken(session.accessToken);
      return session;
    } catch {
      clearAccessToken();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    auth = true,
    retryAuth = true,
    headers = {},
  } = options;
  const requestHeaders = { Accept: "application/json", ...headers };
  const requestOptions = {
    method,
    credentials: "include",
    headers: requestHeaders,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
    requestOptions.body = JSON.stringify(body);
  }
  if (auth && accessToken) {
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, requestOptions);
  } catch {
    throw new ApiError(`No fue posible conectar con ${API_BASE_URL}. Comprueba la dirección publicada, HTTPS, conexión a Internet o bloqueos de red; revisa F12 > Network para identificar CORS u otros errores.`);
  }

  const result = await readBody(response);
  if (response.status === 401 && auth && retryAuth && !path.startsWith("/api/v1/auth/")) {
    const refreshed = await refreshAccessToken();
    if (refreshed) return apiRequest(path, { ...options, retryAuth: false });
    clearAccessToken();
    unauthorizedHandler?.();
  }

  if (!response.ok) {
    const fallback = response.status === 403
      ? "No tienes permisos para realizar esta acción."
      : `La solicitud no se completó (${response.status}).`;
    throw new ApiError(messageFromBody(result, fallback), response.status);
  }
  return result;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}
