import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDice, FaUsers, FaRandom } from "react-icons/fa";
import EntradaTexto from "../components/EntradaTexto";
import { useTheme } from "../Providers/ThemeProvider";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [codigoSala, setCodigoSala] = useState("");

  const handleUnirseSala = () => {
    if (codigoSala.trim() === "") {
      alert("Por favor, ingrese un código de sala válido.");
    } else {
      alert(`Uniéndose a la sala con código: ${codigoSala}`);
      // Aquí puedes hacer navigate(`/sala/${codigoSala}`) cuando tengas esa ruta
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-6 w-full">🎲 Monopoly Bank</h1>

        {/* Botón para crear sala */}
        <button
          className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={() => navigate("/sala")}
        >
          <FaDice className="text-xl" /> Crear Sala
        </button>

        {/* Entrada de texto para ingresar código de sala */}
        <div className="w-full space-y-4 mt-4">
          <EntradaTexto
            label="Código de Sala"
            placeholder="Ingrese el código de la sala"
            value={codigoSala}
            onChange={(e) => setCodigoSala(e.target.value)}
            className="w-full"
          />

          {/* Botón para unirse a una sala */}
          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
            onClick={handleUnirseSala}
          >
            <FaUsers className="text-xl" /> Unirse a una Sala
          </button>

          {/* Botón para unirse a una sala aleatoria */}
          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition duration-200"
            onClick={() => navigate("/sala")}
          >
            <FaRandom className="text-xl" /> Sala Aleatoria
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
