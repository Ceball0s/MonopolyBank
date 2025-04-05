import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Sala from "./pages/Sala";
import Banco from "./pages/Banco";
import Transacciones from "./pages/Transacciones";
import HistorialTransacciones from "./pages/HistorialTransacciones";
import EstadoFinanciero from "./pages/EstadoFinanciero";
import BotonFlotante from "./components/BotonFlotante";
import { Error404, SalaError} from "./pages/Errors";
import { useTheme } from "./Providers/ThemeProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import CrearSala from "./components/CrearSala";


import "./App.css";
function App() {
  const { toggleTheme } = useTheme();

  return (
    <Router>
      <div
        className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images3.alphacoders.com/652/thumb-1920-652712.jpg')",
        }}
      >
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/sala/:codigoSala" element={<ProtectedRoute><Sala /></ProtectedRoute>} />
          <Route path="/banco/:bancoCode" element={<ProtectedRoute><Banco /></ProtectedRoute>} />
          <Route path="/transacciones" element={<ProtectedRoute><Transacciones /></ProtectedRoute>} />
          <Route path="/historial" element={<ProtectedRoute><HistorialTransacciones /></ProtectedRoute>} />
          <Route path="/estado-financiero" element={<ProtectedRoute><EstadoFinanciero /></ProtectedRoute>} />
          <Route path="/crear-sala" element={<ProtectedRoute><CrearSala /></ProtectedRoute>} />

          {/* Rutas de error (no necesitan autenticación) */}
          <Route path="/error404" element={<Error404 />} />
          <Route path="/sala_no_disponible" element={<SalaError />} />
        </Routes>

        {/* Botón flotante para cambiar el tema */}
        <BotonFlotante onClick={toggleTheme} />
      </div>
    </Router>
  );
};

export default App;
