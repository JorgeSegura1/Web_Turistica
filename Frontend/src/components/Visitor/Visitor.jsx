import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Visitor/style/visitor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "../User/Footer"; // Ruta actualizada

function Visitor() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirección automática si el usuario está autenticado
  useEffect(() => {
    if (token) {
      navigate("/visitor"); // Cambia "/inicio" por tu ruta de inicio para usuarios registrados
    }
  }, [token, navigate]);

  const handleLoginClick = () => navigate("/Login");
  const handleRegisterClick = () => navigate("/register");

  const handleInscribirse = async (deporteId) => {
    alert("Debes iniciar sesión para inscribirte.");
    navigate("/login");
  };

  const handleVerHorarios = () => {
    alert("Debes registrarte para ver los horarios.");
  };

  const goToSobreNosotros = () => {
    navigate("/sobrenosotros");
  };

  return (
    <div className="visitor-container">
      {/* NAVBAR */}
      <header className="navbar navbar-expand-lg fixed-top custom-navbar shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => navigate("/visitor")}
          >
            <img
              src="/Fotos/Parapente_logo.png"
              alt="SkyRush Logo"
              className="logo-navbar"
            />
            <span className="navbar-brand text-white fw-bold ms-2">SkyRush</span>
          </div>
          <div>
            <button className="btn btn-light me-2" onClick={handleLoginClick}>
              Iniciar Sesión
            </button>
            <button className="btn btn-light" onClick={handleRegisterClick}>
              Registrarse
            </button>
          </div>
        </div>
      </header>

      {/* HERO + INFO SECTION - CAROUSEL */}
      <section className="info-section">
        <div className="container py-5">
          <div className="text-center mb-5">
            <div className="d-flex justify-content-center align-items-center">
              <div
                style={{
                  height: "2px",
                  width: "50px",
                  backgroundColor: "#ff9900",
                  marginRight: "15px",
                }}
              ></div>
              <h2 className="fw-bold m-0">Descubre la experiencia SkyRush</h2>
              <div
                style={{
                  height: "2px",
                  width: "50px",
                  backgroundColor: "#ff9900",
                  marginLeft: "15px",
                }}
              ></div>
            </div>
          </div>

          <div id="infoCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {/* Slide 1 */}
              <div className="carousel-item active">
                <div
                  className="d-flex flex-column align-items-center justify-content-center text-center text-white p-5"
                  style={{
                    backgroundImage: "url('./public/Fotos/1_.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "700px",
                    borderRadius: "1rem",
                    fontFamily: "Segoe UI, sans-serif",
                  }}
                >
                  <h1 className="display-4 fw-bold">SkyRush Eventos</h1>
                  <p className="lead mt-4">
                    Vuela con nosotros y vive experiencias inolvidables. Desde vuelos
                    recreativos hasta eventos temáticos, nuestro equipo garantiza
                    aventura y seguridad total.
                  </p>
                  <div className="mt-4 d-flex justify-content-center">
                    <button className="btn btn-light" onClick={goToSobreNosotros}>
                      Leer más
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item">
                <div
                  className="d-flex flex-column align-items-center justify-content-center text-center p-5 text-dark"
                  style={{
                    backgroundImage: "url('./public/Fotos/2_.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "700px",
                    borderRadius: "1rem",
                    backdropFilter: "brightness(0.9)",
                    fontFamily: "Segoe UI, sans-serif",
                  }}
                >
                  <div style={{ backgroundColor: "rgba(255, 165, 21, 0.58)", padding: "2rem", borderRadius: "1rem" }}>
                    <h3 className="fw-bold">¿Quiénes somos?</h3>
                    <p className="mt-3 px-4">
                      En <strong>SkyRush</strong> somos un equipo apasionado por el vuelo
                      libre. Con años de experiencia, organizamos eventos y
                      experiencias inolvidables para quienes quieren volar con
                      seguridad y emoción.
                    </p>
                    <p className="px-4">
                      Nos apasiona compartir la sensación de libertad que solo el vuelo puede dar. Ya sea tu
                      primer despegue o tu décimo vuelo, en SkyRush te acompañamos con entusiasmo, atención
                      personalizada y todo el equipamiento necesario para que disfrutes al máximo.
                    </p>
                    <p className="px-4">
                      Nuestra misión es conectar a las personas con la naturaleza y consigo mismas, desde lo alto.
                      Te invitamos a vivir esta experiencia única, rodeado de paisajes impresionantes y emociones
                      que quedarán grabadas para siempre.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="carousel-item">
                <div
                  className="d-flex flex-column align-items-center justify-content-center text-center p-5 text-dark"
                  style={{
                    backgroundImage: "url('./public/Fotos/parapente-aviaciondigital.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "700px",
                    borderRadius: "1rem",
                    fontFamily: "Segoe UI, sans-serif",
                  }}
                >
                  <div style={{ backgroundColor: "rgba(255, 195, 15, 0.4)", padding: "2rem", borderRadius: "1rem" }}>
                    <h3 className="fw-bold">¿Por qué elegir el parapente?</h3>
                    <p className="mt-3 px-4">
                      El parapente no es solo un deporte: es una experiencia única de libertad,
                      aventura y conexión con la naturaleza. ¡Atrévete a volar con nosotros
                      y cambia tu perspectiva del mundo!
                    </p>
                    
                    <button className="btn btn-warning mt-3" onClick={handleVerHorarios}>
                      Ver horarios
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#infoCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#infoCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Visitor;
