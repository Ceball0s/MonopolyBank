import React from "react";
import { useNavigate } from "react-router-dom";

const Banco = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🏦 Banco</h1>

      <div className="w-[400px] p-6 bg-white shadow-2xl rounded-lg space-y-4">
        <button className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700" onClick={() => navigate("/transacciones")}>
          💰 Transacciones
        </button>
        <button className="w-full px-4 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700" onClick={() => navigate("/historial")}>
          📜 Ver Historial
        </button>
        <button className="w-full px-4 py-3 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700" onClick={() => navigate("/estado-financiero")}>
          📊 Estado Financiero
        </button>
      </div>
    </div>
  );
};

export default Banco;
