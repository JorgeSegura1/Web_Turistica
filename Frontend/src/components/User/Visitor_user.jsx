import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../User/Visitor-user.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./Footer";

function Visitor_user() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  const goToLogin = () => navigate("/Login");
  const goToRegister = () => navigate("/register");

  const handleSignUpEvent = async (activityId) => {
    if (!userToken) {
      alert("Debes iniciar sesión para inscribirte.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/inscripcion",
        { deporteId: activityId },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      alert("¡Inscripción exitosa!");
    } catch (error) {
      console.error("Error al inscribirse:", error);
      alert("Error al inscribirse, intenta de nuevo.");
    }
  };

  const viewSchedule = () => {
    navigate("/horarios");
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/Visitor");
  };

  const goToAboutUs = () => {
    navigate("/SobreNosotros");
  };

  const viewMyFlights = () => {
    navigate("/vuelos_inscritos");  // Ruta que llevaría a la vista de "Mis Vuelos"
  };

  return (
    <div className="visitor-main-container">
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
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/perfil")}
                >
                  Ver Perfil
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={viewSchedule}>
                  Ver Horario
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={viewMyFlights}>
                  Mis Vuelos
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={goToAboutUs}>
                  Más Información
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger fw-semibold"
                  onClick={logOutUser}
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* INFO SECTION */}
      <section className="visitor-info-section">
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

          {/* Bloque 1 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h3 className="fw-bold">SkyRush Eventos</h3>
              <p className="mt-3">
                Vuela con nosotros y vive experiencias inolvidables. Desde vuelos recreativos
                hasta eventos temáticos, nuestro equipo garantiza aventura y seguridad total.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/Fotos/1_.jpg"
                alt="Evento SkyRush"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="text-center mb-4">
            <button className="btn btn-warning" onClick={goToAboutUs}>
              Leer más
            </button>
          </div>

          <div
            style={{
              height: "2px",
              backgroundColor: "#ff9900",
              marginBottom: "30px",
            }}
          ></div>

          {/* Bloque 2 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6 text-center">
              <img
                src="/Fotos/2_.jpg"
                alt="Quienes somos"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h3 className="fw-bold">¿Quiénes somos?</h3>
              <p className="mt-3">
                En <strong>SkyRush</strong> somos un equipo apasionado por el vuelo libre.
                Con años de experiencia, organizamos eventos y experiencias inolvidables
                para quienes quieren volar con seguridad y emoción.
              </p>
              <p>
                Nos apasiona compartir la sensación de libertad que solo el vuelo puede dar.
                Ya sea tu primer despegue o tu décimo vuelo, te acompañamos con entusiasmo
                y atención personalizada.
              </p>
            </div>
          </div>

          <div
            style={{
              height: "2px",
              backgroundColor: "#ff9900",
              marginBottom: "30px",
            }}
          ></div>

          {/* Bloque 3 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h3 className="fw-bold">¿Por qué elegir el parapente?</h3>
              <p className="mt-3">
                El parapente no es solo un deporte: es una experiencia única de libertad,
                aventura y conexión con la naturaleza. ¡Atrévete a volar con nosotros
                y cambia tu perspectiva del mundo!
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/Fotos/parapente-aviaciondigital.jpg"
                alt="Parapente"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="text-center mb-4">
            <button className="btn btn-warning" onClick={viewSchedule}>
              Ver horarios
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Visitor_user;
