import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Horarios.css";
import Footer from "./Footer";

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

  // Estados para edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVuelo, setEditVuelo] = useState(null);

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

  // Crear vuelo
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

  // Eliminar vuelo
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

  // Inscribir en vuelo
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

  // Edición de vuelo (solo admin)
  const openEditModal = (vuelo) => {
    setEditVuelo({ ...vuelo });
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditVuelo(null);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditVuelo({ ...editVuelo, [name]: value });
  };
  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/vuelos/${editVuelo.id}`,
        {
          lugar_salida: editVuelo.lugar_salida,
          lugar_llegada: editVuelo.lugar_llegada,
          fecha: editVuelo.fecha,
          hora: editVuelo.hora,
          cupos: editVuelo.cupos,
          comentario: editVuelo.comentario,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get("http://localhost:5000/api/vuelos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVuelos(res.data);
      showAlert("Vuelo actualizado correctamente.", "success");
      closeEditModal();
    } catch {
      showAlert("Error al actualizar el vuelo.", "danger");
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/Visitor");
  };
  const viewMyInscriptions = () => navigate("/vuelos_inscritos");
  const goToAboutUs = () => navigate("/SobreNosotros");
  const viewSchedule = () => navigate("/horarios");

  if (loading) return <p>Cargando horarios…</p>;
  if (error) return <p>Error al cargar: {error.message}</p>;

  return (
    <>
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
                <button className="dropdown-item" onClick={viewMyInscriptions}>
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

      <div className="horarios-container">
        {/* Formulario para crear vuelo solo visible para instructores */}
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
                  setNuevoVuelo({
                    ...nuevoVuelo,
                    lugar_llegada: e.target.value,
                  })
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

        {/* Lista de vuelos */}
        <section className="panel-lista">
          {alert.show && (
            <Alert variant={alert.variant} className="alert-fixed">
              {alert.message}
            </Alert>
          )}
          <h2 className="titulo-centrado">Horarios de Vuelos en Parapente</h2>
          <div className="vuelos-list">
            {vuelos.map((v) => (
              <div key={v.id} className="vuelo-card">
                <p>
                  <strong>Vuelo en Parapente: </strong>
                  {new Date(v.fecha_disponible || v.fecha).toLocaleDateString()} de {v.lugar_salida} a {v.lugar_llegada}
                </p>
                <p>
                  Hora: {v.hora} | Cupos: {v.cupos}
                </p>
                <p>
                  <strong>Comentario del instructor:</strong> {v.comentario}
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
                  <>
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => openEditModal(v)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-orange"
                      onClick={() => eliminarVuelo(v.id)}
                    >
                      Eliminar Vuelo
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal para editar vuelo */}
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Form onSubmit={submitEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Vuelo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Lugar de salida</Form.Label>
              <Form.Control
                name="lugar_salida"
                value={editVuelo?.lugar_salida || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Lugar de llegada</Form.Label>
              <Form.Control
                name="lugar_llegada"
                value={editVuelo?.lugar_llegada || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={editVuelo?.fecha || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                value={editVuelo?.hora || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Cupos</Form.Label>
              <Form.Control
                type="number"
                name="cupos"
                value={editVuelo?.cupos || 0}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comentario"
                value={editVuelo?.comentario || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Footer />
    </>
  );
}
