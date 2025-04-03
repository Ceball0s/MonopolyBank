import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider"; // Importa el hook del tema

const Transacciones = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Obtiene el tema actual
  const [monto, setMonto] = useState("");

  const hacerTransaccion = () => {
    alert("Transacción confirmada");
    navigate("/banco");
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      <h1 className="text-3xl font-bold mb-6">💰 Transacciones</h1>

      <div className={`w-[400px] p-6 shadow-2xl rounded-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } space-y-4`}>
        <select className={`w-full p-2 border rounded ${
          theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
        }`}>
          <option value="transferencia">Transferencia</option>
          <option value="pago">Pago</option>
        </select>

        <input
          type="text"
          placeholder="Jugador de Origen"
          className={`w-full p-2 border rounded ${
            theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
          }`}
        />
        <input
          type="text"
          placeholder="Jugador de Destino"
          className={`w-full p-2 border rounded ${
            theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
          }`}
        />

        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className={`w-full p-2 border rounded ${
            theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
          }`}
        />

        <div className="flex justify-between">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={hacerTransaccion}>
            Confirmar
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => navigate("/banco")}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transacciones;
