import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";
import ListaUsuarios from "../components/ListaUsuarios";

const Sala = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { codigoSala } = useParams(); // Código de la sala
  const [soyAdmin, setSoyAdmin] = useState(false);

  useEffect(() => {
    const adminCodigo = localStorage.getItem("admin"); // Obtiene el admin de localStorage
    setSoyAdmin(adminCodigo === codigoSala); // Es admin solo si creó la sala
  }, [codigoSala]);

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Jugador1" },
    { id: 2, nombre: "Jugador2" },
    { id: 3, nombre: "Jugador3" },
    { id: 4, nombre: "Jugador4" },
  ]);

  const iniciarJuego = () => {
      alert("¡Iniciando partida!");
      navigate("/banco");
  };

  const banearJugador = (nombre) => {
    setUsuarios((prevUsuarios) => prevUsuarios.filter((user) => user.nombre !== nombre));
  };

  const salirDeSala = () => {
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">🎮 Sala de Juego ({codigoSala})</h1>

        {/* Lista de jugadores */}
        <ListaUsuarios 
          usuarios={usuarios} 
          soyAdmin={soyAdmin} 
          banearJugador={banearJugador} 
          iniciarJuego={iniciarJuego} 
        />
        {/* Botón "Salir de la Sala" */}
        <button
          className="w-full mt-4 px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition duration-200"
          onClick={salirDeSala}
        >
          🚪 Salir de la Sala
        </button>
      </div>
    </div>
  );
};

export default Sala;
