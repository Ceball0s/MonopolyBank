import React from "react";
import { useNavigate } from "react-router-dom";

const jugadores = [
  { nombre: "Jugador 1", dinero: 1500 },
  { nombre: "Jugador 2", dinero: 1200 },
  { nombre: "Jugador 3", dinero: 1800 },
  { nombre: "Jugador 4", dinero: 1400 },
];

const EstadoFinanciero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📊 Estado Financiero</h1>

      <div className="w-[400px] p-6 bg-white shadow-2xl rounded-lg">
        <ul className="space-y-4">
          {jugadores.map((jugador, index) => (
            <li key={index} className="flex justify-between text-lg font-semibold text-gray-800">
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
