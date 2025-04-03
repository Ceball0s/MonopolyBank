import React from "react";
import { useTheme } from "../Providers/ThemeProvider"; // Importar el hook del tema

const InputField = ({ label, type = "text", placeholder, value, onChange }) => {
  const { theme } = useTheme(); // Obtener el tema actual

  return (
    <div className="mb-4">
      <label
        className={`block text-lg font-medium mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          theme === "dark"
            ? "bg-gray-700 text-white border-gray-500 placeholder-gray-400"
            : "bg-white text-gray-900 border-gray-300"
        }`}
      />
    </div>
  );
};

export default InputField;
