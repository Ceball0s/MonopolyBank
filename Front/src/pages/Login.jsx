import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EntradaTexto from "../components/EntradaTexto";
import { FaMoneyBillWave } from "react-icons/fa"; 
import { useTheme } from "../Providers/ThemeProvider"; // Importar el hook del tema

const Login = () => {
  const { theme } = useTheme(); // Obtener el tema actual
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigate("/home");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-3 mb-8">
        <FaMoneyBillWave className="text-4xl text-green-600" />
        <h1 className="text-4xl font-bold">Monopoly Bank</h1>
      </div>

      <div
        className={`w-[400px] p-8 shadow-2xl rounded-lg ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">🔑 Iniciar Sesión</h2>

        <EntradaTexto
          label="Usuario"
          placeholder="Ingrese su usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <EntradaTexto
          label="Contraseña"
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full px-4 py-3 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => navigate("/register")}
          className="w-full mt-3 text-blue-600 hover:underline"
        >
          Crear una cuenta
        </button>
      </div>
    </div>
  );
};

export default Login;
