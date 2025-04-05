import React, { useState, useEffect, useContext  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";
import { obtenerDatosBanco, cambiarTurno } from "../api/gameApi";
import { AuthContext } from "../context/AuthContext";

const Banco = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [dineroActual, setDineroActual] = useState(0);
  const [turnoActual, setTurnoActual] = useState("");
  const [nombreJugador, setNombreJugador] = useState("");
  const [listaJugadores, setListaJugadores] = useState([]);

  const { bancoCode } = useParams(); // Código de la sala
  
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    if (!bancoCode || !token || !user) return;

    const cargarDatos = async () => {
      try {
        const data = await obtenerDatosBanco(bancoCode, token, user.id);
        setTurnoActual(data.turnoActual.name);
        setDineroActual(data.miJugador.balance);
        setNombreJugador(data.miJugador.name);
        setListaJugadores(data.balances);
      } catch (error) {
        console.error("Error al obtener los datos del banco:", error);
      }
    };

    cargarDatos();
    const interval = setInterval(cargarDatos, 2000);
    return () => clearInterval(interval);
  }, [bancoCode, token, user.id]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        <h1 className="text-4xl font-bold text-center mb-6 w-full">🏦 Banco</h1>

        <div className="mb-4 text-center">
          <p className="text-xl font-semibold">
            Tu nombre: <span className="text-blue-500">{nombreJugador}</span>
          </p>
          <p className="text-xl font-semibold">
            Tu dinero: <span className="text-green-500">${dineroActual}</span>
          </p>
          <p className="text-lg">
            Turno actual de:{" "}
            <span className="text-purple-500">{turnoActual === nombreJugador ? "¡Tú!" : turnoActual}</span>
          </p>
        </div>

        <button
          disabled={turnoActual !== nombreJugador}
          className={`w-full px-4 py-3 font-semibold rounded-lg transition duration-200 ${
            turnoActual === nombreJugador
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-300 text-white cursor-not-allowed"
          }`}
          onClick={() => navigate("/transacciones", {
            state: {
              bancoCode,
              jugadores: listaJugadores, // array de objetos { id, name }
              jugadorActual: user, // para evitar transacciones consigo mismo
              token,
            },
          })}
        >
          💰 Transacciones
        </button>

        <button
          className="w-full px-4 py-3 mt-4 font-semibold rounded-lg transition duration-200 bg-red-600 text-white hover:bg-red-700"
          onClick={() => navigate("/historial",{ state: { bancoCode, token } })}
        >
          📜 Ver Historial
        </button>

        <button
          className="w-full px-4 py-3 mt-4 font-semibold rounded-lg transition duration-200 bg-yellow-600 text-white hover:bg-yellow-700"
          onClick={() => navigate("/estado-financiero", { state: { bancoCode } })}
        >
          📊 Estado Financiero
        </button>

        <button
          disabled={turnoActual !== nombreJugador}
          // className="w-full px-4 py-3 mt-6 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-200"
          className = {`w-full px-4 py-3 mt-6 font-semibold text-white bg-purple-600 rounded-lg ${
            turnoActual === nombreJugador
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-purple-300 text-white cursor-not-allowed"
          }`}
          onClick={() => cambiarTurno(bancoCode, token)}
        >
          🔁 Pasar Turno
        </button>

        <button
          className="w-full px-4 py-3 mt-4 font-semibold rounded-lg transition duration-200 bg-gray-500 text-white hover:bg-gray-600"
          onClick={() => navigate("/")}
        >
          🚪 Salir del Banco
        </button>
      </div>
    </div>
  );
};

export default Banco;
