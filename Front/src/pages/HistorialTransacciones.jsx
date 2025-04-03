import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider"; // Importa el hook del tema

const HistorialTransacciones = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Obtiene el tema actual

  const transacciones = [
    { id: 1, origen: "Jugador1", destino: "Jugador2", monto: 500, tipo: "Transferencia" },
    { id: 2, origen: "Banco", destino: "Jugador3", monto: 1000, tipo: "Pago" },
    { id: 3, origen: "Jugador4", destino: "Jugador1", monto: 300, tipo: "Transferencia" },
    { id: 4, origen: "Jugador2", destino: "Banco", monto: 150, tipo: "Multa" },
  ];

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">📜 Historial de Transacciones</h1>

      <div
        className={`w-[500px] p-6 shadow-2xl rounded-lg ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
              <th className="p-2">#</th>
              <th className="p-2">Origen</th>
              <th className="p-2">Destino</th>
              <th className="p-2">Monto</th>
              <th className="p-2">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((t) => (
              <tr key={t.id} className={`border-t ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                <td className="p-2">{t.id}</td>
                <td className="p-2">{t.origen}</td>
                <td className="p-2">{t.destino}</td>
                <td className="p-2">${t.monto}</td>
                <td className="p-2">{t.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => navigate("/banco")}
          className="w-full mt-6 px-4 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default HistorialTransacciones;
