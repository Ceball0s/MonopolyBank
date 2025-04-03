import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EntradaTexto from "../components/EntradaTexto";
import { FaUserPlus } from "react-icons/fa"; 
import { useTheme } from "../Providers/ThemeProvider"; // Importamos el hook del tema

const Register = () => {
  const { theme } = useTheme(); // Obtener el tema actual
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    alert("Cuenta creada. Redirigiendo a login...");
    navigate("/login");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-3 mb-8">
        <FaUserPlus className="text-4xl text-green-600" />
        <h1 className="text-4xl font-bold">Registro</h1>
      </div>

      <div
        className={`w-[400px] p-8 shadow-2xl rounded-lg ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">📝 Crear Cuenta</h2>

        <EntradaTexto
          label="Usuario"
          placeholder="Elige un usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <EntradaTexto
          label="Contraseña"
          type="password"
          placeholder="Crea una contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
          onClick={handleRegister} 
          className="w-full px-4 py-3 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition duration-200"
        >
          Registrarse
        </button>

        <button 
          onClick={() => navigate("/login")}
          className="w-full mt-3 text-blue-600 hover:underline"
        >
          Ya tengo una cuenta
        </button>
      </div>
    </div>
  );
};

export default Register;
