import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  apiRequest,
  clearAccessToken,
  refreshAccessToken,
  setAccessToken,
  setUnauthorizedHandler,
} from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setUnauthorizedHandler(() => {
      if (active) setUser(null);
    });

    refreshAccessToken()
      .then((session) => {
        if (!active || !session) return;
        setUser(session.user);
        return apiRequest("/api/v1/auth/me")
          .then((profile) => {
            if (active) setUser(profile);
          })
          .catch(() => {
            if (active) {
              clearAccessToken();
              setUser(null);
            }
          });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      setUnauthorizedHandler(null);
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const session = await apiRequest("/api/v1/auth/login", {
      method: "POST",
      body: credentials,
      auth: false,
    });
    setAccessToken(session.accessToken);
    setUser(session.user);
    return session.user;
  }, []);

  const register = useCallback(async (account) => {
    const session = await apiRequest("/api/v1/auth/register", {
      method: "POST",
      body: account,
      auth: false,
    });
    setAccessToken(session.accessToken);
    setUser(session.user);
    return session.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiRequest("/api/v1/auth/logout", { method: "POST", auth: false });
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  return value;
}
