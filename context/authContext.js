import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebaseConfing";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
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
      const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log('response.user:', response?.user);
    //setUser(response?.user);
    //setIsAuthenticated(true);
    await setDoc(doc(db,"users", response?.user?.uid),{
      
    })
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
