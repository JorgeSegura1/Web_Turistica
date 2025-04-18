import React from "react";
import "../Visitor/style/Visitor.css"; // Reutiliza el mismo CSS

function Footer() {
  return (
    <footer className="footer-container">
      <div className="container py-5">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h3 className="footer-title">SkyRush</h3>
            <p className="footer-subtext">
              Hecho en Colombia
              
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="footer-heading">Ubicación</h5>
            <p className="footer-text mb-0">Calle 22 #5A-45, Barrio El Prado</p>
            <p className="footer-text">Santa Marta, Magdalena</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="footer-heading">Contacto</h5>
            <p className="footer-text mb-0">skyRush2004@gmail.com</p>
            <p className="footer-text">(+57) 3126915311</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;