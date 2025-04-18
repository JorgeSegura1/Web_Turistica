import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [pais, setPais] = useState("");
  const [telefono, setTelefono] = useState("");
  const [prefijo, setPrefijo] = useState("+57");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      nombre,
      apellido,
      correo,
      pais,
      prefijo,
      numero: telefono,
      contrasena: password,
    };
  
    try {
      console.log("Enviando datos al servidor..."); // Depuración
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      console.log("Respuesta del servidor:", data); // Depuración
      if (!response.ok) {
        throw new Error(data.msg || "Error al registrar");
      }
  
      alert("Registro exitoso. Por favor, inicia sesión.");
      navigate("/login"); // Redirigir al login
    } catch (error) {
      console.error("Error al registrar:", error); // Depuración
      alert(error.message);
    }
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <div className="register-left">
          <img
            src="/Fotos/Register.jpg"
            alt="Parapente"
            className="register-image"
          />
        </div>
        <div className="register-right">
          <h2>Registro</h2>
          <p>
            Para experiencias más personalizadas, comparta su nombre y dirección
            de correo electrónico.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>

            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <select value={pais} onChange={(e) => setPais(e.target.value)}>
              <option value="">País</option>
              <option value="Colombia">Colombia</option>
              <option value="Argentina">Argentina</option>
              <option value="Mexico">México</option>
              <option value="Chile">Chile</option>
              <option value="Uruguay">Uruguay</option>
            </select>

            <div className="form-row">
              <select
                value={prefijo}
                onChange={(e) => setPrefijo(e.target.value)}
              >
                <option value="+57">+57</option>
                <option value="+1">+1</option>
                <option value="+52">+52</option>
              </select>
              <input
                type="tel"
                placeholder="Número de teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Repetir contraseña"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />

            <div className="form-footer">
              <Link to="/login" className="login-link">
                Ya tengo una cuenta
              </Link>
              <div>
                <button type="submit" className="btn-send">
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;