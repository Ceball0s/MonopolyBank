import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";

const Banco = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [dineroActual, setDineroActual] = useState(5000);
  const [turnoActual, setTurnoActual] = useState("Alice");

  // Simulación de jugadores
  const jugadores = ["Alice", "Bob"];

  // Verifica si es el turno del jugador activo (en este caso, Alice)
  const esMiTurno = turnoActual === "Alice";

  // Función para pasar el turno
  const pasarTurno = () => {
    const siguiente = jugadores.find(j => j !== turnoActual);
    setTurnoActual(siguiente);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-6 w-full">🏦 Banco</h1>

        {/* Información del jugador */}
        <div className="mb-4 text-center">
          <p className="text-xl font-semibold">
            Turno actual: <span className="text-blue-500">{turnoActual}</span>
          </p>
          <p className="text-xl font-semibold">
            Dinero disponible: <span className="text-green-500">${dineroActual}</span>
          </p>
        </div>

        {/* Botón para Transacciones */}
        <button
          disabled={!esMiTurno}
          className={`w-full px-4 py-3 font-semibold rounded-lg transition duration-200 ${
            esMiTurno
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-300 text-white cursor-not-allowed"
          }`}
          onClick={() => navigate("/transacciones")}
        >
          💰 Transacciones
        </button>

        {/* Botón para ver Historial */}
        <button
          //disabled={!esMiTurno}
          className={`w-full px-4 py-3 mt-4 font-semibold rounded-lg transition duration-200 bg-red-600 text-white hover:bg-red-700`}
          onClick={() => navigate("/historial")}
        >
          📜 Ver Historial
        </button>

        {/* Botón para ver Estado Financiero */}
        <button
          //disabled={!esMiTurno}
          className={`w-full px-4 py-3 mt-4 font-semibold rounded-lg transition duration-200 bg-yellow-600 text-white hover:bg-yellow-700 `}
          onClick={() => navigate("/estado-financiero")}
        >
          📊 Estado Financiero
        </button>
        {/* Botón para pasar el turno */}
        <button
          //disabled={!esMiTurno}
          className="w-full px-4 py-3 mt-6 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-200"
          onClick={pasarTurno}
        >
          🔁 Pasar Turno
        </button>

        {/* Botón para salir del banco */}
        <button
          //disabled={!esMiTurno}
          className={`w-full px-4 py-3 mt-4 font-semibold rounded-lg transition duration-200 bg-gray-500 text-white hover:bg-gray-600`}
          onClick={() => navigate("/home")}
        >
          🚪 Salir del Banco
        </button>
      </div>
    </div>
  );
};

export default Banco;
