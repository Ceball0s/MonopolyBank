import React, { createContext, useState, useContext, useEffect } from 'react';

// Definir el contexto del tema
const ThemeContext = createContext();

// Proveedor del tema que envuelve la aplicación
export const ThemeProvider = ({ children }) => {
  // Estado para manejar el tema, inicializado desde localStorage o por defecto 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Efecto para actualizar localStorage y la clase del body cuando cambia el tema
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme; // Asigna la clase del tema al body
  }, [theme]);

  // Función para alternar entre temas
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Proveer el estado y la función de alternar a los componentes hijos
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto del tema
export const useTheme = () => useContext(ThemeContext);
