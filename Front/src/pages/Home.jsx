import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaDice, FaUsers, FaSignOutAlt } from "react-icons/fa";
import EntradaTexto from "../components/EntradaTexto";
import { useTheme } from "../Providers/ThemeProvider";
import { AuthContext } from "../context/AuthContext";
import { joinGame } from "../api/gameApi";
import { createGame } from "../api/gameApi";

const Home = () => {
  const { logout, user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [codigoSala, setCodigoSala] = useState("");

  // const handleCrearSala = () => {
  //   localStorage.setItem("admin", "true");
  //   navigate("/crear-sala");
  // };

  const handleCrearSala = async () => {    
    try {
      const data = await createGame(token, "", 8);
      localStorage.setItem("admin", data.code); // Opcional
      console.log("Sala creada:", data);
      navigate(`/sala/${data.game.code}`);
    } catch (error) {
      alert(`Error al crear la sala: ${error.message}`);
    }
  };
  const handleUnirseSala = async () => {
    if (codigoSala.trim() === "") {
      alert("Por favor, ingrese un código de sala válido.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await joinGame(token, codigoSala.trim());
      const currentPlayerId = localStorage.getItem("playerId");
      const soyAdmin = response.game.admin === currentPlayerId;

      localStorage.setItem("admin", "false");
      alert("¡Unido a la sala exitosamente!");
      navigate(`/sala/${response.game.code}`);
    } catch (error) {
      alert(error.message || "Error al unirse a la sala");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        

        <h1 className="text-4xl font-bold text-center mb-6 w-full">🎲 Monopoly Bank</h1>

        {/* 👤 Mostrar nombre del usuario */}
        {user && (
          <p className="text-xl font-medium text-center mb-2">
            Bienvenido, {user.name}
          </p>
        )}
        <button
          className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={handleCrearSala}
        >
          <FaDice className="text-xl" /> Crear Sala
        </button>

        <div className="w-full space-y-4 mt-4">
          <EntradaTexto
            label="Código de Sala"
            placeholder="Ingrese el código de la sala"
            value={codigoSala}
            onChange={(e) => setCodigoSala(e.target.value)}
            className="w-full"
          />

          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
            onClick={handleUnirseSala}
          >
            <FaUsers className="text-xl" /> Unirse a una Sala
          </button>

          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-yellow-700 transition duration-200"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-xl" /> Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
