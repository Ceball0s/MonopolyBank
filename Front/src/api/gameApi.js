const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Valor por defecto

export const createGame = async (token, name, maxPlayers) => {
    try {
      const response = await fetch(`${API_URL}/api/game/create`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
          name,
          maxPlayers,
      }),
      });
  
      if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al crear la sala");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error creando juego:", error);
      throw error;
    }
  };
  
  
export const joinGame = async (token, code) => {
  try {
    const response = await fetch(`${API_URL}/api/game/join`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code }),
    });

    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al unirse a la sala");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uniendo a sala:", error);
    throw error;
  }
};

export const salirDeLaPartida = async ({ code, token }) => {
  try {
    const response = await fetch(`${API_URL}/api/game/leave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al salir de la partida');
    }

    console.log('✅ Saliste de la partida:', data);
    return data;

  } catch (error) {
    console.error('❌ Error al salir de la partida:', error.message);
    throw error;
  }
}


export const getGameById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/api/game/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el juego");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el juego:", error);
    throw error;
  }
};

export const getGameByCode = async (token, code) => {
  try {
    const response = await fetch(`${API_URL}/api/game/code/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al obtener el juego");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener juego por código:", error);
    throw error;
  }
};


export const startGame = async (token, code) => {
  try {
    const response = await fetch(`${API_URL}/api/game/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al iniciar la partida");
    }

    return await response.json();
  } catch (error) {
    console.error("Error iniciando partida:", error);
    throw error;
  }
};


export const obtenerDatosBanco = async (codigoSala, token, jugadorId) => {
  try {
    const response = await fetch(`${API_URL}/api/bank/balances/${codigoSala}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al obtener datos del banco");
    }

    const { actualTurn, balances } = await response.json();

    const miJugador = balances.find((j) => j.id === jugadorId);
    const jugadorActual = balances.find((j) => j.id === actualTurn);

    return {
      turnoActual: jugadorActual || {},
      miJugador: miJugador || {},
      balances: balances || [],
      esMiTurno: jugadorActual?.id === miJugador?.id,
    };
  } catch (error) {
    console.error("Error obteniendo datos del banco:", error);
    throw error;
  }
};

export const cambiarTurno = async (code, token) => {
  try {
    const response = await fetch(`${API_URL}/api/bank/next-turn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // el token del jugador autenticado
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al cambiar de turno");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error al cambiar de turno:", error);
    throw error;
  }
};

export async function transferMoney({ fromId, toId, amount, code, token }) {
  try {
    console.log(code, fromId, toId, amount);
    const response = await fetch(`${API_URL}/api/bank/transfer-money`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // si usas authMiddleware
      },
      body: JSON.stringify({
        fromId,
        toId,
        amount,
        code
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al realizar la transferencia');
    }

    return data; // contiene { message, transaction }
  } catch (error) {
    console.error('Error en transferMoney:', error.message);
    throw error;
  }
}


// utils/api.js o donde prefieras
export const getHistory = async ({ gameCode, token }) => {
  try {
    const response = await fetch(`http://localhost:5000/api/history/${gameCode}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener el historial');
    }

    const data = await response.json();
    return data.history;
  } catch (error) {
    console.error('Error al obtener historial de transacciones:', error);
    return [];
  }
};
