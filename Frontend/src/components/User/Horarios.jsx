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
      .then((res) => {
        console.log("Respuesta vuelos:", res.data);
        setVuelos(res.data);
      })
      .catch((err) => {
        console.error("Error cargando vuelos:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
      });

      const res = await axios.get("http://localhost:5000/api/vuelos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVuelos(res.data);
    } catch (error) {
      console.error("Error al crear vuelo:", error);
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
      console.error("Error eliminando vuelo:", err);
      alert("No se pudo eliminar.");
    }
  };

  if (loading) return <p>Cargando horarios…</p>;
  if (error) return <p>Error al cargar horarios: {error.message}</p>;

  return (
    <div className="horarios-container">
      <h2>Horarios de Vuelos</h2>

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
          <button type="submit">Crear Vuelo</button>
        </form>
      )}

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
            {userRole === "administrador" && (
              <button onClick={() => eliminarVuelo(v.id)}>Eliminar vuelo</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
