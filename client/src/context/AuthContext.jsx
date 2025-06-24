import React, { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

 
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

 
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
    setToken(null);
  };


  const login = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

 
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


export const useAuth = () => useContext(AuthContext);
