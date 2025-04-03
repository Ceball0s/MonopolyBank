import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Providers/ThemeProvider";

const Error404 = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        <h1 className="text-6xl font-bold">404 😢</h1>
        <p className="text-xl mt-2">Página no encontrada</p>
        <button
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

const SalaError = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        <h1 className="text-4xl font-bold">❌ Error 😕</h1>
        <p className="text-lg mt-2">No tienes permiso para entrar a esta sala</p>
        <p className="text-lg">Código no disponible o la sala ya ha iniciado</p>
        <button
          className="mt-6 px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg text-white"
          onClick={() => navigate("/home")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export { Error404, SalaError };
