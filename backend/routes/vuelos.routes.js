// backend/routes/vuelos.routes.js
const express = require('express');
const router  = express.Router();

const { verifyToken } = require('../middleware/auth');
const { crearVuelo, obtenerVuelos } = require('../controllers/vuelos.controller');
const {
  crearComentario,
  obtenerComentariosVuelo
} = require('../controllers/comentarios.controller');

// Rutas de vuelos
router.post('/', verifyToken, crearVuelo);
router.get('/',  verifyToken, obtenerVuelos);

// Rutas de comentarios sobre un vuelo
router.post(
  '/:vueloId/comentarios',
  verifyToken,
  crearComentario
);
router.get(
  '/:vueloId/comentarios',
  verifyToken,             // opcional si quieres que cualquiera vea comentarios
  obtenerComentariosVuelo
);

module.exports = router;
