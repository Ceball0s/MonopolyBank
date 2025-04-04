import { createContext, useState, useEffect } from "react";
import { loginRequest } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Manejo de inicio de sesión
  const login = async (email, password) => {
    try {
      const respuesta = await loginRequest(email, password);
      localStorage.setItem("token", respuesta.token);
      localStorage.setItem("user", JSON.stringify(respuesta.player));
      setToken(respuesta.token);
      setUser(respuesta.player);
    } catch (error) {
      console.error("Error en login:", error);
      throw error; 
    }
  };

  // Manejo de cierre de sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
