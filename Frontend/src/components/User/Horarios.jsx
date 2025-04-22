import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Horarios.css";

export default function Horarios() {
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [nuevoVuelo, setNuevoVuelo] = useState({
    lugar_salida: "",
    lugar_llegada: "",
    fecha: "",
    hora: "",
    cupos: 0,
    comentario: "",
  });

  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError(new Error("No autenticado"));
      setLoading(false);
      return;
    }
    axios
      .get("http://localhost:5000/api/vuelos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVuelos(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [token]);

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 3000);
  };

  const crearVuelo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/vuelos", nuevoVuelo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await axios.get("http://localhost:5000/api/vuelos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVuelos(res.data);
      setNuevoVuelo({
        lugar_salida: "",
        lugar_llegada: "",
        fecha: "",
        hora: "",
        cupos: 30,
        comentario: "",
      });
      showAlert("Vuelo creado exitosamente.", "success");
    } catch {
      showAlert("Error al crear el vuelo.", "danger");
    }
  };

  const eliminarVuelo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vuelos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVuelos((v) => v.filter((vuelo) => vuelo.id !== id));
      showAlert("Vuelo eliminado exitosamente.", "success");
    } catch {
      showAlert("Error al eliminar el vuelo.", "danger");
    }
  };

  const inscribirVuelo = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/inscripciones/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get("http://localhost:5000/api/vuelos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVuelos(res.data);
      showAlert("Inscripción realizada con éxito.", "success");
    } catch {
      showAlert("Error al inscribirse en el vuelo.", "danger");
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/Visitor");
  };

  const viewInscribedFlights = () => navigate("/vuelos_inscritos");

  if (loading) return <p>Cargando horarios…</p>;
  if (error) return <p>Error al cargar: {error.message}</p>;

  return (
    <>
      <header className="navbar fixed-top">
        <div className="navbar-left" onClick={() => navigate("/user/visitor_user")}>
          <img
            src="/Fotos/Parapente_logo.png"
            alt="SkyRush Logo"
            className="logo-navbar"
          />
          <span className="navbar-brand">SkyRush</span>
        </div>
        <div className="navbar-right">
          {userRole === "publico" && (
            <button
              className="btn btn-light me-2"
              onClick={viewInscribedFlights}
            >
              Mis Vuelos
            </button>
          )}
          <button className="btn btn-light" onClick={logOutUser}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="horarios-container">
        {userRole === "instructor" && (
          <aside className="panel-formulario">
            {alert.show && (
              <Alert variant={alert.variant} className="alert-fixed">
                {alert.message}
              </Alert>
            )}
            <form className="form-vuelo" onSubmit={crearVuelo}>
              <h3>Crear nuevo vuelo</h3>
              <input
                name="lugar_salida"
                placeholder="Lugar de salida"
                value={nuevoVuelo.lugar_salida}
                onChange={(e) =>
                  setNuevoVuelo({ ...nuevoVuelo, lugar_salida: e.target.value })
                }
                required
              />
              <input
                name="lugar_llegada"
                placeholder="Lugar de llegada"
                value={nuevoVuelo.lugar_llegada}
                onChange={(e) =>
                  setNuevoVuelo({ ...nuevoVuelo, lugar_llegada: e.target.value })
                }
                required
              />
              <input
                type="date"
                name="fecha"
                value={nuevoVuelo.fecha}
                onChange={(e) =>
                  setNuevoVuelo({ ...nuevoVuelo, fecha: e.target.value })
                }
                required
              />
              <input
                type="time"
                name="hora"
                value={nuevoVuelo.hora}
                onChange={(e) =>
                  setNuevoVuelo({ ...nuevoVuelo, hora: e.target.value })
                }
                required
              />
              <input
                type="number"
                name="cupos"
                placeholder="Cupos"
                value={nuevoVuelo.cupos}
                onChange={(e) =>
                  setNuevoVuelo({ ...nuevoVuelo, cupos: e.target.value })
                }
                required
              />
              <textarea
                name="comentario"
                placeholder="Comentario"
                rows={3}
                value={nuevoVuelo.comentario}
                onChange={(e) =>
                  setNuevoVuelo({ ...nuevoVuelo, comentario: e.target.value })
                }
                className="comentario-field"
              />
              <button type="submit" className="btn btn-primary">
                Crear Vuelo
              </button>
            </form>
          </aside>
        )}

        <section className="panel-lista">
          {userRole !== "instructor" && alert.show && (
            <Alert variant={alert.variant} className="alert-fixed">
              {alert.message}
            </Alert>
          )}
          <h2 className="titulo-centrado">Horarios de Vuelos</h2>
          <div className="vuelos-list">
            {vuelos.map((v) => (
              <div key={v.id} className="vuelo-card">
                <p>
                  <strong>
                    {new Date(v.fecha_disponible || v.fecha).toLocaleDateString()}
                  </strong>{" "}
                  de {v.lugar_salida} a {v.lugar_llegada}
                </p>
                <p>
                  Hora: {v.hora} | Cupos: {v.cupos}
                </p>
                <p>
                  <strong>Importante:</strong> {v.comentario}
                </p>
                {userRole === "publico" && (
                  <button
                    className="btn btn-orange mt-2"
                    onClick={() => inscribirVuelo(v.id)}
                  >
                    Inscribirse
                  </button>
                )}
                {userRole === "administrador" && (
                  <button
                    className="btn btn-orange"
                    onClick={() => eliminarVuelo(v.id)}
                  >
                    Eliminar Vuelo
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="footer-container">
        <div className="footer-content">
          <p>SkyRush © 2023 - Todos los derechos reservados</p>
          <p>Contacto: info@skyrush.com | Teléfono: +123 456 789</p>
        </div>
      </footer>
    </>
  );
}
