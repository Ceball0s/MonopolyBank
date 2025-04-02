import React, { useState } from "react";
import EntradaTexto from "../components/EntradaTexto";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    // Aquí puedes llamar a la API para validar el login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">🔑 Iniciar Sesión</h2>
        
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
          className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
