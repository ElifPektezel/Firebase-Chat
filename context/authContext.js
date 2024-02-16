import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 3000);
  }, []);

  const login = async (email, password) => {
    try {
      // Giriş işlemleri 
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const logout = async () => {
    try {
      // Çıkış işlemleri 
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      // Kayıt işlemleri 
    } catch (e) {
      console.error("Register error:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
