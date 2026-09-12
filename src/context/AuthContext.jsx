import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try { setUser((await apiFetch("/api/auth/me")).user); }
    catch { setUser(null); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = useCallback(async (credentials) => {
    const payload = await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) });
    setUser(payload.user);
    return payload.user;
  }, []);

  const register = useCallback(async (details) => {
    const payload = await apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(details) });
    setUser(payload.user);
    return payload.user;
  }, []);

  const logout = useCallback(async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const changePassword = useCallback(async (details) => {
    const payload = await apiFetch("/api/auth/password", { method: "PATCH", body: JSON.stringify(details) });
    setUser(payload.user);
    return payload.user;
  }, []);

  const value = useMemo(() => ({ user, loading, isAdmin: user?.role === "admin", login, register, logout, changePassword, refresh }), [user, loading, login, register, logout, changePassword, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
