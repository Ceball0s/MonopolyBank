import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDice, FaUsers, FaRandom } from "react-icons/fa";
import EntradaTexto from "../components/EntradaTexto";

const Home = () => {
  const navigate = useNavigate();
  const [codigoSala, setCodigoSala] = useState(""); // Estado para el código de sala

  const handleUnirseSala = () => {
    if (codigoSala.trim() === "") {
      alert("Por favor, ingrese un código de sala válido.");
    } else {
      alert(`Uniéndose a la sala con código: ${codigoSala}`);
      // Aquí puedes hacer navigate(`/sala/${codigoSala}`) cuando tengas esa ruta
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">🎲 Monopoly Bank</h1>

      <div className="w-[400px] p-8 bg-white shadow-2xl rounded-lg space-y-4">
        <button 
          className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={() => navigate("/sala")}
        >
          <FaDice className="text-xl" /> Crear Sala
        </button>

        {/* Entrada de texto para ingresar el código de la sala */}
        <EntradaTexto
          label="Código de Sala"
          placeholder="Ingrese el código de la sala"
          value={codigoSala}
          onChange={(e) => setCodigoSala(e.target.value)}
        />

        <button 
          className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
          onClick={() => navigate("/sala")}
        >
          <FaUsers className="text-xl" /> Unirse a una Sala
        </button>

        <button 
          className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition duration-200"
          onClick={() => navigate("/sala")}
        >
          <FaRandom className="text-xl" /> Sala Aleatoria
        </button>
      </div>
    </div>
  );
};

export default Home;
