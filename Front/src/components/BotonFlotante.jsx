import React from "react";
import { useTheme } from "../Providers/ThemeProvider";
import { Sun, Moon } from "lucide-react"; // Importamos los iconos

const BotonFlotante = ({ onClick }) => {
  const { theme } = useTheme(); // Obtener el tema actual

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
      style={{
        backgroundColor: theme === "dark" ? "#1E293B" : "#3B82F6", // Azul en claro, gris oscuro en oscuro
        color: "white",
      }}
    >
      {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />} {/* Cambia icono */}
    </button>
  );
};

export default BotonFlotante;
