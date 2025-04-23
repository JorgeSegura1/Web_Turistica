import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Perfil.css";

const Perfil = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmarPassword: "",
    prefijo: "+57",
    telefono: "",
  });

  const [imagen, setImagen] = useState("https://cdn-icons-png.flaticon.com/512/847/847969.png");
  const [nuevaImagen, setNuevaImagen] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGuardarImagen = () => {
    if (!nuevaImagen) {
      Swal.fire("Selecciona una imagen antes de guardar.");
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se actualizará tu foto de perfil.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setImagen(nuevaImagen);
        setNuevaImagen(null);
        Swal.fire("Actualizado!", "Tu foto de perfil ha sido cambiada.", "success");
      } else {
        setNuevaImagen(null);
        Swal.fire("Cancelado", "Tu foto de perfil no fue cambiada.", "info");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", formData);
    Swal.fire("Guardado", "Tus datos han sido actualizados.", "success");
  };

  const handleReset = () => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      confirmarPassword: "",
      prefijo: "+57",
      telefono: "",
    });
  };

  return (
    <div className="container mt-5 perfil-container">
      {/* Botón pequeño y naranja para volver */}
      <div className="mb-4 text-start">
        <button
          className="btn btn-sm btn-warning rounded-pill px-3 py-1"
          onClick={() => navigate("/user/visitor_user")}
        >
          ⬅ Volver
        </button>
      </div>

      <div className="row">
        <div className="col-md-4 text-center mb-4">
          <h3 className="mb-3">Mi Perfil</h3>
          <img src={nuevaImagen || imagen} alt="Foto de perfil" className="img-perfil" />

          <input
            type="file"
            accept="image/*"
            className="form-control mt-3"
            onChange={handleImageChange}
          />

          <button
            className="btn btn-outline-success mt-3"
            onClick={handleGuardarImagen}
          >
            Guardar Foto
          </button>
        </div>

        <div className="col-md-8">
          <h4 className="mb-4">¿Deseas actualizar tus datos?</h4>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmarPassword"
                  value={formData.confirmarPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label>Prefijo</label>
                <select
                  className="form-control"
                  name="prefijo"
                  value={formData.prefijo}
                  onChange={handleChange}
                >
                  <option value="+57">+57 (Colombia)</option>
                  <option value="+51">+51 (Perú)</option>
                  <option value="+52">+52 (México)</option>
                  <option value="+54">+54 (Argentina)</option>
                </select>
              </div>

              <div className="col-md-8">
                <label>Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-outline-warning me-2">
                Guardar Cambios
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleReset}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
