const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Valor por defecto

export const loginRequest = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    // El backend devolvió un error → lanzamos con el mensaje
    throw new Error(data.error || "Error en login");
  }

  return data;
};

export const registerRequest = async (name, email, password) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error en el registro");
  }

  return response.json();
};

