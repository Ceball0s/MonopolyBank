import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";
import { obtenerDatosBanco } from "../api/gameApi"; // Asegúrate de tener esta función implementada
import { AuthContext } from "../context/AuthContext"; // Asumiendo que tienes acceso al token

const EstadoFinanciero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const { token } = useContext(AuthContext); // <- Necesitas el token para la petición
  const { bancoCode } = location.state || {};

  const [jugadores, setJugadores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const datos = await obtenerDatosBanco(bancoCode, token);
        setJugadores(datos.balances);
      } catch (error) {
        console.error("Error al obtener datos del banco:", error);
      } finally {
        setCargando(false);
      }
    };

    if (bancoCode && token) fetchDatos();
  }, [bancoCode, token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto space-y-4`}
      >
        <h1 className="text-3xl font-bold text-center w-full">📊 Estado Financiero</h1>

        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <ul className="w-full space-y-4">
            {jugadores.map((jugador, index) => (
              <li
                key={jugador.id}
                className={`flex justify-between text-lg font-semibold p-3 rounded-lg
                ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"}`}
              >
                <span>{jugador.name}</span>
                <span className="font-bold">${jugador.balance}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => navigate(`/banco/${bancoCode}`)}
          className="w-full px-4 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
        >
          🔙 Volver
        </button>
      </div>
    </div>
  );
};

export default EstadoFinanciero;
