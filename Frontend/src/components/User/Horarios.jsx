// src/components/User/Horarios.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Horarios.css";

export default function Horarios() {
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoVuelo({ ...nuevoVuelo, [name]: value });
  };

  const crearVuelo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/vuelos", nuevoVuelo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Vuelo creado correctamente!");
      setNuevoVuelo({
        lugar_salida: "",
        lugar_llegada: "",
        fecha: "",
        hora: "",
        cupos: 30,
        comentario: "",
      });
      const res = await axios.get("http://localhost:5000/api/vuelos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVuelos(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al crear vuelo.");
    }
  };

  const eliminarVuelo = async (id) => {
    if (userRole !== "administrador") return;
    try {
      await axios.delete(`http://localhost:5000/api/vuelos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVuelos((v) => v.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar.");
    }
  };

  const inscribirVuelo = async (vueloId) => {
    if (userRole !== "publico") {
      alert("Solo usuarios públicos pueden inscribirse.");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/inscripciones/${vueloId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Inscripción realizada con éxito!");
      // refrescar vuelos para mostrar cupos actualizados
      const res = await axios.get("http://localhost:5000/api/vuelos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVuelos(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error al inscribirse.");
    }
  };

  if (loading) return <p>Cargando horarios…</p>;
  if (error) return <p>Error al cargar horarios: {error.message}</p>;

  return (
    <div
      className={`horarios-container ${
        userRole === "instructor" ? "with-form" : "without-form"
      }`}
    >
      <h2>Horarios de Vuelos</h2>

      {/* Formulario para instructores */}
      {userRole === "instructor" && (
        <form className="form-vuelo" onSubmit={crearVuelo}>
          <h3>Crear nuevo vuelo</h3>
          <input
            type="text"
            name="lugar_salida"
            placeholder="Lugar de salida"
            value={nuevoVuelo.lugar_salida}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lugar_llegada"
            placeholder="Lugar de llegada"
            value={nuevoVuelo.lugar_llegada}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fecha"
            value={nuevoVuelo.fecha}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="hora"
            value={nuevoVuelo.hora}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="cupos"
            placeholder="Cupos disponibles"
            value={nuevoVuelo.cupos}
            onChange={handleChange}
            required
          />
          <textarea
            name="comentario"
            placeholder="Comentario o instrucción extra"
            value={nuevoVuelo.comentario}
            onChange={handleChange}
            rows={3}
          />
          <button type="submit">Crear Vuelo</button>
        </form>
      )}

      <div className="vuelos-list-container">
        <div className="vuelos-list">
          {vuelos.length === 0 ? (
            <p>No hay vuelos disponibles.</p>
          ) : (
            vuelos.map((v) => (
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
                    className="btn-inscribirse"
                    onClick={() => inscribirVuelo(v.id)}
                  >
                    Inscribirse
                  </button>
                )}

                {userRole === "administrador" && (
                  <button onClick={() => eliminarVuelo(v.id)}>
                    Eliminar vuelo
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
