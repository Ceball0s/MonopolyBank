import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";

const HistorialTransacciones = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const transacciones = [
    { id: 1, origen: "Jugador1", destino: "Jugador2", monto: 500, tipo: "Transferencia" },
    { id: 2, origen: "Banco", destino: "Jugador3", monto: 1000, tipo: "Pago" },
    { id: 3, origen: "Jugador4", destino: "Jugador1", monto: 300, tipo: "Transferencia" },
    { id: 4, origen: "Jugador2", destino: "Banco", monto: 150, tipo: "Multa" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`w-full max-w-2xl p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto space-y-4`}
      >
        {/* Título */}
        <h1 className="text-3xl font-bold text-center w-full">📜 Historial de Transacciones</h1>

        {/* Tabla de historial */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} text-lg`}>
                <th className="p-3">#</th>
                <th className="p-3">Origen</th>
                <th className="p-3">Destino</th>
                <th className="p-3">Monto</th>
                <th className="p-3">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map((t, index) => (
                <tr
                  key={t.id}
                  className={`border-t text-lg ${theme === "dark" ? "border-gray-600" : "border-gray-300"}
                  ${index % 2 === 0 ? (theme === "dark" ? "bg-gray-700" : "bg-gray-100") : ""}`}
                >
                  <td className="p-3">{t.id}</td>
                  <td className="p-3">{t.origen}</td>
                  <td className="p-3">{t.destino}</td>
                  <td className="p-3">${t.monto}</td>
                  <td className="p-3">{t.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón de volver */}
        <button
          onClick={() => navigate("/banco")}
          className="w-full px-4 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
        >
          🔙 Volver
        </button>
      </div>
    </div>
  );
};

export default HistorialTransacciones;
