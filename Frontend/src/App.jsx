import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Visitor from "./components/Visitor/Visitor";
import Visitor_user from "./components/User/Visitor_user";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Login/Register";
import SobreNosotros from "./components/Visitor/SobreNosotros";
import Perfil from "./components/User/Perfil.jsx";
import Horarios  from './components/User/Horarios';
import VuelosInscritos from "./components/User/Vuelos_inscritos";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta raíz redirigida a Visitor */}
        <Route path="/" element={<Navigate to="/visitor" />} />
        <Route path="/visitor" element={<Visitor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/visitor_user" element={<Visitor_user />} />
        <Route path="/horarios" element={<Horarios  />} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/vuelos_inscritos" element={<VuelosInscritos />} />
      </Routes>
    </Router>
  );
}

export default App;