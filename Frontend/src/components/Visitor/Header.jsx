import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="navbar fixed-top">
      <div className="navbar-left" onClick={() => navigate("/visitor")}>
        <img
          src="/Fotos/Parapente_logo.png"
          alt="SkyRush Logo"
          className="logo-navbar"
        />
        <span className="navbar-brand">SkyRush</span>
      </div>
      <button className="btn btn-light" onClick={() => navigate("/login")}>
        Cerrar Sesión
      </button>
    </header>
  );
}

export default Header;
