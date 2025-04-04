import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EntradaTexto from "../components/EntradaTexto";
import { FaMoneyBillWave } from "react-icons/fa"; 
import { useTheme } from "../Providers/ThemeProvider";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
  const { login } = useContext(AuthContext);
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("debe llenar los campos");
      return 
    } 
    try {
      await login(email, password); // ✅ Aquí debería ejecutarse bien
      navigate("/"); // 🔥 Redirige si todo sale bien
    } catch (error) {
      alert(error);
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
          <FaMoneyBillWave className="text-4xl text-green-600" />
          <h1 className="text-4xl font-bold w-full text-center">Monopoly Bank</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 w-full">🔑 Iniciar Sesión</h2>

        {/* Inputs */}
        <div className="w-full space-y-4 flex-grow">
          <EntradaTexto
            label="Usuario"
            placeholder="Ingrese su usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />

          <EntradaTexto
            label="Contraseña"
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Botones */}
        <div className="w-full mt-6">
          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
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
    </div>
  );
};

export default Login;
