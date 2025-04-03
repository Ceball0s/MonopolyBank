import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sala = () => {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Jugador1", listo: false },
    { id: 2, nombre: "Jugador2", listo: false },
    { id: 3, nombre: "Jugador3", listo: false },
    { id: 4, nombre: "Jugador4", listo: false },
  ]);

  const usuarioActual = "Jugador1";

  const toggleListo = () => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((user) =>
        user.nombre === usuarioActual ? { ...user, listo: !user.listo } : user
      )
    );

    // Si todos los jugadores están listos, navegar a la vista de Banco
    if (usuarios.every((user) => user.listo || user.nombre === usuarioActual)) {
      setTimeout(() => navigate("/banco"), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🎮 Sala de Juego</h1>

      <div className="w-[400px] p-6 bg-white shadow-2xl rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Jugadores en la Sala</h2>

        <ul className="space-y-3">
          {usuarios.map((user) => (
            <li key={user.id} className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded-lg">
              <span className="font-medium">{user.nombre}</span>
              <span className={`px-3 py-1 text-sm rounded-full ${user.listo ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {user.listo ? "Listo ✅" : "No Listo ❌"}
              </span>
            </li>
          ))}
        </ul>

        <button
          className="w-full mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={toggleListo}
        >
          {usuarios.find((u) => u.nombre === usuarioActual)?.listo ? "Cancelar Listo" : "Estoy Listo"}
        </button>
      </div>
    </div>
  );
};

export default Sala;
