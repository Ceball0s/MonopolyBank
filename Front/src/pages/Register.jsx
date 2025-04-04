import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EntradaTexto from "../components/EntradaTexto";
import { FaUserPlus } from "react-icons/fa"; 
import { useTheme } from "../Providers/ThemeProvider";
import { registerRequest } from "../api/authApi";

const Register = () => {
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [correo, setcorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerRequest(username, correo, password);
      alert("Cuenta creada. Redirigiendo a login...");
      navigate("/login");
    } catch (error) {
      alert(error.message); // Muestra el error si el registro falla
    } 
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`w-full max-w-md p-8 shadow-2xl rounded-lg bg-opacity-95
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        flex flex-col items-center h-auto min-h-[400px]`}
      >
        {/* Icono y Título */}
        <div className="flex items-center space-x-3 mb-4 w-full">
          <FaUserPlus className="text-4xl text-green-600" />
          <h1 className="text-4xl font-bold w-full text-center">Registro</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 w-full">📝 Crear Cuenta</h2>

        {/* Inputs */}
        <div className="w-full space-y-4 flex-grow">
          <EntradaTexto
            label="Usuario"
            placeholder="Elige un usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
          <EntradaTexto
            label="Correo"
            placeholder="Digite su correo"
            value={correo}
            onChange={(e) => setcorreo(e.target.value)}
            className="w-full"
          />

          <EntradaTexto
            label="Contraseña"
            type="password"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Botones */}
        <div className="w-full mt-6">
          <button 
            onClick={handleRegister} 
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition duration-200"
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
    </div>
  );
};

export default Register;
