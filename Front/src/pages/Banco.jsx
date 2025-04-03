import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";

const Banco = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-6 w-full">🏦 Banco</h1>

        {/* Botón para Transacciones */}
        <button
          className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={() => navigate("/transacciones")}
        >
          💰 Transacciones
        </button>

        {/* Botón para ver Historial */}
        <button
          className="w-full px-4 py-3 mt-4 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
          onClick={() => navigate("/historial")}
        >
          📜 Ver Historial
        </button>

        {/* Botón para ver Estado Financiero */}
        <button
          className="w-full px-4 py-3 mt-4 font-semibold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition duration-200"
          onClick={() => navigate("/estado-financiero")}
        >
          📊 Estado Financiero
        </button>

        {/* Botón para salir del banco */}
        <button
          className="w-full px-4 py-3 mt-4 font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
          onClick={() => navigate("/home")}
        >
          🚪 Salir del Banco
        </button>
      </div>
    </div>
  );
};

export default Banco;
