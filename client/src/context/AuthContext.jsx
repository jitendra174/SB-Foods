import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const fetchUser = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setIsAdmin(data.isAdmin || false);
      } else {
        console.warn("⚠️ Token invalid:", data.message);
        handleLogout();
      }
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
      handleLogout();
    }
  };

  const login = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAdmin(false);
  };

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        token,
        login,
        logout: handleLogout,
        setUser,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
