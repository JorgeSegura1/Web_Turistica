import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../User/Footer"; // Ruta actualizada
import './SobreNosotros.css';

const SobreNosotros = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
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
            {token ? (
              <button className="btn btn-light" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            ) : (
              <>
                <button className="btn btn-light me-2" onClick={handleLoginClick}>
                  Iniciar Sesión
                </button>
                <button className="btn btn-light" onClick={handleRegisterClick}>
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* TÍTULO */}
      <section className="titulo-sobre-nosotros">
        <h1>Sobre Nosotros</h1>
        <p>Conocé quiénes somos y por qué amamos lo que hacemos</p>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="info-section sobre-nosotros-section">
        <div className="sobre-grid">
          <div className="descripcion">
            <h2>Nuestra Historia</h2>
            <p>
              Somos una agencia turística dedicada a crear experiencias inolvidables. Nuestro objetivo es promover el turismo local con responsabilidad, pasión y creatividad.
            </p>
            <p>
              Contamos con un equipo profesional y comprometido, que trabaja día a día para mostrar lo mejor de cada destino.
            </p>
          </div>

          <div className="comentarios-form">
            <h2>Dejanos tu comentario</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Tu nombre" required />
              <input type="email" placeholder="Tu correo electrónico" required />
              <textarea placeholder="Tu comentario" rows="5" required></textarea>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default SobreNosotros;
