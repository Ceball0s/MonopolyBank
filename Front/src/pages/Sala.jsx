import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider"; 

const Sala = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Jugador1", listo: false },
    { id: 2, nombre: "Jugador2", listo: false },
    { id: 3, nombre: "Jugador3", listo: false },
    { id: 4, nombre: "Jugador4", listo: false },
  ]);

  const usuarioActual = "Jugador1";

  const toggleListo = () => {
    setUsuarios((prevUsuarios) => {
      const nuevosUsuarios = prevUsuarios.map((user) =>
        user.nombre === usuarioActual ? { ...user, listo: !user.listo } : user
      );

      // Verificamos si TODOS los jugadores están listos
      const todosListos = nuevosUsuarios.every((user) => user.listo);
      if (todosListos) {
        setTimeout(() => navigate("/banco"), 500);
      }

      return nuevosUsuarios;
    });
  };

  const salirDeSala = () => {
    navigate("/home"); // Redirige al usuario al Home
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">🎮 Sala de Juego</h1>

        <h2 className="text-xl font-semibold text-center mb-4">Jugadores en la Sala</h2>

        <ul className="space-y-3 w-full">
          {usuarios.map((user) => (
            <li 
              key={user.id} 
              className={`flex items-center justify-between px-4 py-2 rounded-lg
              ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
            >
              <span className="font-medium">{user.nombre}</span>
              <span className={`px-3 py-1 text-sm rounded-full
                ${user.listo ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
              >
                {user.listo ? "Listo ✅" : "No Listo ❌"}
              </span>
            </li>
          ))}
        </ul>

        {/* Botón "Estoy Listo" o "Cancelar Listo" */}
        <button
          className={`w-full mt-4 px-4 py-2 rounded-lg transition duration-200 text-white
            ${usuarios.find((u) => u.nombre === usuarioActual)?.listo
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"}`}
          onClick={toggleListo}
        >
          {usuarios.find((u) => u.nombre === usuarioActual)?.listo ? "Cancelar Listo" : "Estoy Listo"}
        </button>

        {/* Botón "Salir de la Sala" */}
        <button
          className="w-full mt-4 px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition duration-200"
          onClick={salirDeSala}
        >
          Salir de la Sala 🚪
        </button>
      </div>
    </div>
  );
};

export default Sala;
