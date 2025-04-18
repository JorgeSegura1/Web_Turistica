import React from 'react';
import './UserDashboard.css'

function UserDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate("/login.js");
  };

  const handleInscribirse = (deporteId) => {
    if (!token) {
      alert("Debes iniciar sesión para inscribirte.");
      navigate("/login");
      return;
    }

    axios
    .post(
      "http://localhost:3001/api/inscripcion",
      { deporteId },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      alert("¡Inscripción exitosa!");
    })
    .catch(() => {
      alert("Error al inscribirse, intenta de nuevo.");
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login/login.jsx");
  };

  return (
    <div className="visitor-container">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src="/Fotos/Parapente_logo.png"
              alt="SkyRush Logo"
              className="logo-navbar"
            />
            <span className="navbar-brand text-white fw-bold ms-2">
              SkyRush
            </span>
          </div>

          <div>
            {token ? (
              <button className="btn btn-light me-2" onClick={handleLogout}>
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
      </nav>

      {/* HERO */}
      <section className="hero-section text-center py-5">
        <h1 className="mb-4">¿Quiénes somos?</h1>
        <p className="mb-4">
          En SkyRush somos una empresa apasionada por las alturas, la adrenalina y las experiencias inolvidables. Nacimos en el 2015 con un solo objetivo: llevar a las personas a vivir la increíble sensación de volar.
          <br /><br />
          Contamos con un equipo de instructores certificados, con más de 8 años de experiencia en deportes extremos y especializados en vuelos de parapente. Nuestro compromiso es brindarte seguridad, confianza y, sobre todo, una aventura que recordarás para siempre.
          <br /><br />
          En SkyRush no solo vendemos vuelos, vendemos libertad.
        </p>
        <button className="btn btn-warning" onClick={() => handleInscribirse(1)}>
          Inscribirse
        </button>
      </section>

      {/* INFORMACIÓN */}
      <section className="info-section text-center py-5">
        <h2 className="mb-4">¿Por qué elegir el parapente?</h2>
        <p className="mb-5">
          El parapente no es solo un deporte, es una experiencia única de conexión con la naturaleza.
        </p>

        <div className="card mx-auto" style={{ maxWidth: "400px" }}>
          <img
            src="https://img1.wsimg.com/isteam/ip/8d6c24da-4875-44c5-a47b-0068c8284fef/ddc0a665-e35d-44b8-9701-a3190893a58f.jpg"
            className="card-img-top"
            alt="Parapente"
          />
          <div className="card-body">
            <h5 className="card-title">Inscríbete y empieza a volar</h5>
            <p className="card-text">
              Únete a nuestros vuelos guiados por expertos y disfruta del aire libre como nunca antes.
            </p>
            <button className="btn btn-warning" onClick={() => handleInscribirse(1)}>
              Inscribirse
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


export default UserDashboard;
