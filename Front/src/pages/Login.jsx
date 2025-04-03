import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import EntradaTexto from "../components/EntradaTexto";
import { FaMoneyBillWave } from "react-icons/fa"; // Ícono de dinero

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = () => {
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    if (username === "admin" && password === "admin") {
      navigate("/home");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Título Monopoly Bank */}
      <div className="flex items-center space-x-3 mb-8">
        <FaMoneyBillWave className="text-4xl text-green-600" />
        <h1 className="text-4xl font-bold text-gray-900">Monopoly Bank</h1>
      </div>

      {/* Contenedor del login */}
      <div className="w-[400px] p-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">🔑 Iniciar Sesión</h2>

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
