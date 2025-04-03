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
import { useTheme } from "./Providers/ThemeProvider";
import "./App.css";
function App() {
  const { toggleTheme } = useTheme();

  return (
    <Router>
      <div
        className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1329644/pexels-photo-1329644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sala" element={<Sala />} />
          <Route path="/banco" element={<Banco />} />
          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/historial" element={<HistorialTransacciones />} />
          <Route path="/estado-financiero" element={<EstadoFinanciero />} />
        </Routes>
      
        {/* Botón flotante para ir a la sala */}
        <BotonFlotante onClick={toggleTheme}/>
      </div>
    </Router>
  );
}

export default App;
