import React from "react";

const ListaUsuarios = ({ usuarios, soyAdmin, banearJugador, iniciarJuego }) => {
  const miUsuario = "Jugador1";
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-center mb-4">Jugadores en la Sala</h2>

      <ul className="space-y-3">
        {usuarios.map((user) => (
          <li 
            key={user.id} 
            className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            <span className="font-medium">{user.nombre}</span>
            {soyAdmin && miUsuario != user.nombre && (
              <button 
                onClick={() => banearJugador(user.nombre)} 
                className="ml-2 px-2 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                🚫 Banear
              </button>
            )}
          </li>
        ))}
      </ul>

      {soyAdmin && (
        <button
          className="w-full mt-4 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition duration-200"
          onClick={iniciarJuego}
        >
          🎮 Iniciar Juego
        </button>
      )}
    </div>
  );
};

export default ListaUsuarios;
