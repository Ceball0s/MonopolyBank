import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";
import { transferMoney } from "../api/gameApi"; // Asegúrate de ajustar el path

const Transacciones = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const [monto, setMonto] = useState("");
  const [tipoTransaccion, setTipoTransaccion] = useState("pago");
  const [jugadorOrigen, setJugadorOrigen] = useState("");
  const [jugadorDestino, setJugadorDestino] = useState("");

  const { bancoCode , jugadores = [], jugadorActual, token } = location.state || {};
  console.log(bancoCode);
  const hacerTransaccion = async () => {
    if (!jugadorOrigen || !jugadorDestino || monto <= 0) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }

    try {
      await transferMoney({
        fromId: jugadorOrigen,
        toId: jugadorDestino,
        amount: parseInt(monto),
        code: bancoCode,
        token,
      });

      alert(`Transacción confirmada: ${tipoTransaccion} de ${jugadorOrigen} a ${jugadorDestino} por $${monto}`);
      navigate(`/banco/${bancoCode}`);
    } catch (err) {
      alert(`Error al hacer la transacción: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px] space-y-4`}
      >
        <h1 className="text-3xl font-bold text-center w-full">💰 Transacciones</h1>

        <select 
          value={tipoTransaccion} 
          onChange={(e) => setTipoTransaccion(e.target.value)}
          className={`w-full p-3 rounded-lg text-lg font-medium outline-none
          ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900 border-gray-300"}`}
        >
          <option value="" disabled hidden>Seleccione el tipo de transacción</option>
          <option value="pago">Pago</option>
          <option value="cobro">Cobro</option>
        </select>

        <select
          value={jugadorOrigen}
          onChange={(e) => setJugadorOrigen(e.target.value)}
          className={`w-full p-3 rounded-lg text-lg font-medium outline-none
          ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900 border-gray-300"}`}
        >
          <option value="" disabled hidden>Seleccione un jugador de origen</option>
          <option key={jugadorActual.id} value={jugadorActual.id}>{jugadorActual.name}</option>
          {/* <option value="Banco">Banco</option> */}
        </select>

        <select
          value={jugadorDestino}
          onChange={(e) => setJugadorDestino(e.target.value)}
          className={`w-full p-3 rounded-lg text-lg font-medium outline-none
          ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900 border-gray-300"}`}
        >
          <option value="" disabled hidden>Seleccione un jugador de destino</option>
          {jugadores
            .filter(j => j.id !== jugadorOrigen || j.id === "Banco")
            .map((jugador) => (
              <option key={jugador.id} value={jugador.id}>{jugador.name}</option>
            ))}
          {/* <option value="Banco">Banco</option> */}
        </select>

        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className={`w-full p-3 rounded-lg text-lg font-medium outline-none
          ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900 border-gray-300"}`}
        />

        <div className="flex w-full justify-between">
          <button 
            className="w-[48%] px-4 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
            onClick={hacerTransaccion}
          >
            ✅ Confirmar
          </button>
          <button 
            className="w-[48%] px-4 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
            onClick={() => navigate(`/banco/${bancoCode}`)}
          >
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transacciones;
