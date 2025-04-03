import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Sala from "./pages/Sala";
import Banco from "./pages/Banco";
import Transacciones from "./pages/Transacciones";
import HistorialTransacciones from "./pages/HistorialTransacciones";
import EstadoFinanciero from "./pages/EstadoFinanciero";
function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
