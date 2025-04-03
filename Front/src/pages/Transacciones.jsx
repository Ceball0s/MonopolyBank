import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Transacciones = () => {
  const navigate = useNavigate();
  const [monto, setMonto] = useState("");

  const  HacerTrasacion = () => {
    alert("Transacción confirmada")
    navigate("/banco")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">💰 Transacciones</h1>

      <div className="w-[400px] p-6 bg-white shadow-2xl rounded-lg space-y-4">
        <select className="w-full p-2 border rounded">
          <option value="transferencia">Transferencia</option>
          <option value="pago">Pago</option>
        </select>

        <input type="text" placeholder="Jugador de Origen" className="w-full p-2 border rounded" />
        <input type="text" placeholder="Jugador de Destino" className="w-full p-2 border rounded" />

        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div className="flex justify-between">
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => HacerTrasacion()}>
            Confirmar
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => navigate("/banco")}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transacciones;
