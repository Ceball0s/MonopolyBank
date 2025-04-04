import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";

const Transacciones = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [monto, setMonto] = useState("");
  const [tipoTransaccion, setTipoTransaccion] = useState("pago");
  const [jugadorOrigen, setJugadorOrigen] = useState("");
  const [jugadorDestino, setJugadorDestino] = useState("");

  // Lista de jugadores (puedes reemplazar con datos dinámicos)
  const jugadores = ["Alice", "Bob", "Carlos", "Diana", "Banco"];

  const hacerTransaccion = () => {
    if (!jugadorOrigen || !jugadorDestino || monto <= 0) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }
    alert(`Transacción confirmada: ${tipoTransaccion} de ${jugadorOrigen} a ${jugadorDestino} por $${monto}`);
    navigate("/banco");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px] space-y-4`}
      >
        {/* Título */}
        <h1 className="text-3xl font-bold text-center w-full">💰 Transacciones</h1>

        {/* Tipo de Transacción */}
        <select 
          value={tipoTransaccion} 
          onChange={(e) => setTipoTransaccion(e.target.value)}
          className={`w-full p-3 rounded-lg text-lg font-medium outline-none
          ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900 border-gray-300"}`}
        >
          <option value=""disabled>Seleccione el tipo de transacción</option>
          <option value="pago">Pago</option>
          <option value="cobro">Cobro</option>
        </select>

        {/* Jugador de Origen */}
        <select
          value={jugadorOrigen}
          onChange={(e) => setJugadorOrigen(e.target.value)}
          className={`w-full p-3 rounded-lg text-lg font-medium outline-none
          ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900 border-gray-300"}`}
        >
          <option value=""disabled>Seleccione un jugador de origen</option>
          {jugadores.map((jugador) => (
            <option key={jugador} value={jugador}>{jugador}</option>
          ))}
        </select>

        {/* Jugador de Destino */}
        <select
          value={jugadorDestino}
          onChange={(e) => setJugadorDestino(e.target.value)}
          className={`w-full p-3 rounded-lg text-lg font-medium outline-none
          ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900 border-gray-300"}`}
        >
          <option value=""disabled>Seleccione un jugador de destino</option>
          {jugadores.filter(jugador => jugador !== jugadorOrigen) // excluir el jugador de origen  
          .map((jugador) => (
            <option key={jugador} value={jugador}>{jugador}</option>
          ))}
        </select>

        {/* Monto */}
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className={`w-full p-3 rounded-lg text-lg font-medium outline-none
          ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900 border-gray-300"}`}
        />

        {/* Botones de acción */}
        <div className="flex w-full justify-between">
          <button 
            className="w-[48%] px-4 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
            onClick={hacerTransaccion}
          >
            ✅ Confirmar
          </button>
          <button 
            className="w-[48%] px-4 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
            onClick={() => navigate("/banco")}
          >
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transacciones;
