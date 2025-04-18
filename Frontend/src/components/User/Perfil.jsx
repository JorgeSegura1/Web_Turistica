import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Perfil.css";

const Perfil = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
  const [imagenAnterior, setImagenAnterior] = useState(imagen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenAnterior(imagen); // Guardamos la imagen actual por si cancela
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
        // Si cancela, volvemos a la imagen anterior
        setNuevaImagen(null);
        Swal.fire("Cancelado", "Tu foto de perfil no fue cambiada.", "info");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", formData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5 perfil-container">
      {/* Navbar */}
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
            {token && (
              <button className="btn btn-light" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </header>

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
              <button type="reset" className="btn btn-outline-danger">
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
