import React, { createContext, useContext, useEffect, useState } from "react";

// 🔐 Create context
const AuthContext = createContext();

// 🔧 Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  // 🌐 Fetch user/admin info based on token
  const fetchUser = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setIsAdmin(data.isAdmin || false);
      } else {
        console.warn("⚠️ Invalid token:", data.message);
        handleLogout();
      }
    } catch (err) {
      console.error("❌ Auth fetch error:", err.message);
      handleLogout();
    }
  };

  // 🧹 Logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
    setToken(null);
  };

  // 🧠 Set token on login/signup
  const login = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // 📦 Fetch user/admin on token change
  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
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

// ✅ Easy hook
export const useAuth = () => useContext(AuthContext);
