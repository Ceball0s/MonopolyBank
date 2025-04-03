import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider"; // Importa el hook del tema

const jugadores = [
  { nombre: "Jugador 1", dinero: 1500 },
  { nombre: "Jugador 2", dinero: 1200 },
  { nombre: "Jugador 3", dinero: 1800 },
  { nombre: "Jugador 4", dinero: 1400 },
];

const EstadoFinanciero = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Obtiene el tema actual

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">📊 Estado Financiero</h1>

      <div
        className={`w-[400px] p-6 shadow-2xl rounded-lg ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <ul className="space-y-4">
          {jugadores.map((jugador, index) => (
            <li
              key={index}
              className={`flex justify-between text-lg font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              <span>{jugador.nombre}</span>
              <span>${jugador.dinero}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/banco")}
          className="w-full mt-6 px-4 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default EstadoFinanciero;
