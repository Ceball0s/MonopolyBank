import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";

const jugadores = [
  { nombre: "Alice", dinero: 1500 },
  { nombre: "Bob", dinero: 1200 },
  { nombre: "Carlos", dinero: 1800 },
  { nombre: "Diana", dinero: 1400 },
];

const EstadoFinanciero = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto space-y-4`}
      >
        {/* Título */}
        <h1 className="text-3xl font-bold text-center w-full">📊 Estado Financiero</h1>

        {/* Lista de jugadores */}
        <ul className="w-full space-y-4">
          {jugadores.map((jugador, index) => (
            <li
              key={index}
              className={`flex justify-between text-lg font-semibold p-3 rounded-lg
              ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"}`}
            >
              <span>{jugador.nombre}</span>
              <span className="font-bold">${jugador.dinero}</span>
            </li>
          ))}
        </ul>

        {/* Botón de volver */}
        <button
          onClick={() => navigate("/banco")}
          className="w-full px-4 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
        >
          🔙 Volver
        </button>
      </div>
    </div>
  );
};

export default EstadoFinanciero;
