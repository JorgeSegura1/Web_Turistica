// frontend/src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");   // Aquí se ingresa el correo
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");           // Para mostrar errores
  const [success, setSuccess] = useState("");       // Para mostrar mensajes de éxito
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Armar objeto con las credenciales
    const loginData = { correo: username, contrasena: password };
    console.log("Datos enviados al servidor:", loginData);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      // Para debug: mostrar status de la respuesta
      console.log("Respuesta completa del servidor:", response);

      const data = await response.json();
      console.log("Datos procesados del servidor:", data);

      if (!response.ok) {
        throw new Error(data.msg || "Error en el servidor");
      }

      // Guardar token y rol en el almacenamiento local
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.rol);
      console.log("Token y rol guardados en localStorage:", { token: data.token, rol: data.rol });

      // Redirigir al componente de usuario (asegúrate de que la ruta exista en React Router)
      setSuccess("Inicio de sesión exitoso.");
      navigate("/user/visitor_user");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(err.message || "Credenciales inválidas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img 
          src="./Fotos/sesion.jpg" 
          alt="Foto_login" 
          className="login-logo"
        />
      </div>
      <div className="login-content">
        <h2>Iniciar Sesión</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario (Correo):</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
          ¿No tienes una cuenta?{" "}
          <Link to="/register" style={{ color: "#6b73ff", fontWeight: "bold" }}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
