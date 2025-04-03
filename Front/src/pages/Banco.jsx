import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider"; // Importa el hook del tema

const Banco = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Obtiene el tema actual

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      <h1 className="text-3xl font-bold mb-6">🏦 Banco</h1>

      <div className={`w-[400px] p-6 shadow-2xl rounded-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } space-y-4`}>
        <button
          className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/transacciones")}
        >
          💰 Transacciones
        </button>
        <button
          className="w-full px-4 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700"
          onClick={() => navigate("/historial")}
        >
          📜 Ver Historial
        </button>
        <button
          className="w-full px-4 py-3 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
          onClick={() => navigate("/estado-financiero")}
        >
          📊 Estado Financiero
        </button>
      </div>
    </div>
  );
};

export default Banco;
