// src/pages/CrearSala.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EntradaTexto from "../components/EntradaTexto";
import { AuthContext } from "../context/AuthContext";
import { createGame } from "../api/gameApi";
import { useTheme } from "../Providers/ThemeProvider";

const CrearSala = () => {
  const [nombreSala, setNombreSala] = useState("");
  const [maxJugadores, setMaxJugadores] = useState(0);
  const { token } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleCrear = async () => {
    if ( maxJugadores < 2) {
      alert("Por favor, completa los campos correctamente.");
      return;
    }

    try {
      const data = await createGame(token, nombreSala, maxJugadores);
      localStorage.setItem("admin", data.code); // Opcional
      console.log("Sala creada:", data);
      navigate(`/sala/${data.game.code}`);
    } catch (error) {
      alert(`Error al crear la sala: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        <h1 className="text-4xl font-bold text-center mb-6 w-full">Crear Sala</h1>

        <div className="w-full space-y-4">
          {/* <EntradaTexto
            label="Nombre de la sala"
            placeholder="Ej: Sala divertida"
            value={nombreSala}
            onChange={(e) => setNombreSala(e.target.value)}
          /> */}
          <EntradaTexto
            label="Máximo de jugadores"
            type="number"
            value={maxJugadores}
            onChange={(e) => setMaxJugadores(Number(e.target.value))}
            min={2}
            max={10}
          />
          <button
            onClick={handleCrear}
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition duration-200"
          >
            Crear Sala
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearSala;
