import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";
import ListaUsuarios from "../components/ListaUsuarios";
import { AuthContext } from "../context/AuthContext";
import { getGameByCode, startGame } from "../api/gameApi";


const Sala = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { codigoSala } = useParams(); // Código de la sala

  const [soyAdmin, setSoyAdmin] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [estadoJuego, setEstadoJuego] = useState("waiting");

  const { token } = useContext(AuthContext); // obtener token

  useEffect(() => {
    const adminCodigo = localStorage.getItem("admin"); // Obtiene el admin de localStorage
    setSoyAdmin(adminCodigo === "true"); // Es admin solo si creó la sala
  }, [codigoSala]);

  // Dentro de Sala
  

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const game = await getGameByCode(token, codigoSala);
        setEstadoJuego(game.started); // Actualiza el estado del juego
        
        if (game.started) {
          navigate(`/banco/${codigoSala}`);
          alert("✅ Partida iniciada");
        }

        // Mapear jugadores a formato esperado por ListaUsuarios
        const jugadores = game.players.map(player => ({
          id: player._id,
          nombre: player.name,
        }));
        setUsuarios(jugadores);
      } catch (error) {
        navigate("/");
        alert("Error al obtener la sala:", error);
        //console.error("Error obteniendo estado de sala:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [codigoSala, token]);

  const iniciarJuego = async () => {
    try {
      const data = await startGame(token, codigoSala);
      
      //navigate("/banco");
    } catch (error) {
      alert("❌ Error al iniciar la partida: " + error.message);
    }
  };

  const banearJugador = (nombre) => {
    setUsuarios((prevUsuarios) => prevUsuarios.filter((user) => user.nombre !== nombre));
  };

  const salirDeSala = () => {
    localStorage.setItem("admin", "false");
    navigate("/");
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
          soyAdmin={true}
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
