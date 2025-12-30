import { createContext, useContext, useEffect, useState } from "react";
import http from "../api/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshMe() {
    try {
      const res = await http.get("/api/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(email, password) {
    const res = await http.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    await refreshMe();
  }

  async function register(name, email, password) {
    const res = await http.post("/api/auth/register", { name, email, password });
    localStorage.setItem("token", res.data.token);
    await refreshMe();
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
