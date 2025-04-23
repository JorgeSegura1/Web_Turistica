import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Vuelos_inscritos.css";
import Footer from "./Footer";

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
      {/* NAVBAR */}
      <header className="navbar navbar-expand-lg fixed-top custom-navbar shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => navigate("/user/visitor_user")}
          >
            <img
              src="/Fotos/Parapente_logo.png"
              alt="SkyRush Logo"
              className="logo-navbar"
            />
            <span className="navbar-brand text-white fw-bold ms-2">
              SkyRush
            </span>
          </div>

          <div className="dropdown">
            <button
              className="btn custom-toggle-btn"
              type="button"
              id="userMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="hamburger-icon">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end shadow"
              aria-labelledby="userMenuButton"
            >
              <li>
                <button className="dropdown-item" onClick={() => navigate("/perfil")}>
                  Ver Perfil
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => navigate("/horarios")}>
                  Ver Horario
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => navigate("/vuelos_inscritos")}>
                  Mis Vuelos
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => navigate("/SobreNosotros")}>
                  Más Información
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item text-danger fw-semibold"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <h2 className="titulo">Vuelos Inscritos</h2>
      <div className="vuelos-list-container">
        {vuelos.length === 0 ? (
          <p>No estás inscrito en ningún vuelo.</p>
        ) : (
          <>
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

            <div className="mensaje-pago-box mt-4">
  <i className="bi bi-calendar-check me-2 fs-4 text-success"></i>
  <span>
    <strong>¡Importante!</strong> El pago de tu vuelo se realizará <u>completamente el mismo día del vuelo</u>. 
    Asegúrate de presentarte a tiempo para disfrutar al máximo de la experiencia.
  </span>
</div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
