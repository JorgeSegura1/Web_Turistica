import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Vuelos_inscritos.css";
import Footer from "./Footer"; // Ruta actualizada

export default function VuelosInscritos() {
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError(new Error("No autenticado"));
      setLoading(false);
      return;
    }

    axios
      .get("/api/inscripciones", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVuelos(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/visitor");
  };

  if (loading) return <p>Cargando vuelos inscritos…</p>;
  if (error) return <p>Error al cargar vuelos: {error.message}</p>;

  return (
    <div className="vuelos-inscritos-container">
      <header className="navbar">
        <div className="navbar-left" onClick={() => navigate("/user/Visitor_user")}>
          <img
            src="/Fotos/Parapente_logo.png"
            alt="SkyRush Logo"
            className="logo-navbar"
          />
          <span className="navbar-brand">SkyRush</span>
        </div>
        <div className="navbar-right">
          <button className="btn btn-light me-2" onClick={() => navigate("/horarios")}>
            Horarios de vuelos
          </button>
          <button className="btn btn-light" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <h2 className="titulo">Vuelos Inscritos</h2>
      <div className="vuelos-list-container">
        {vuelos.length === 0 ? (
          <p>No estás inscrito en ningún vuelo.</p>
        ) : (
          <div className="vuelos-list">
            {vuelos.map((v) => (
              <div key={v.id} className="vuelo-card">
                <p>
                  <strong>
                    {new Date(v.fecha).toLocaleDateString()}
                  </strong>{" "}
                  de {v.lugar_salida} a {v.lugar_llegada}
                </p>
                <p>Hora: {v.hora} | Cupos: {v.cupos}</p>
                <p>
                  <strong>Comentario:</strong> {v.comentario}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
