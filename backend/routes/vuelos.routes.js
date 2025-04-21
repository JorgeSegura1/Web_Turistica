// backend/routes/vuelos.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  crearVuelo,
  obtenerVuelos,
  deleteVuelo         // <— importamos
} = require('../controllers/vuelos.controller');

// Listar vuelos
router.get('/', verifyToken, obtenerVuelos);

// Crear vuelo (instructor)
router.post('/', verifyToken, crearVuelo);

// Eliminar vuelo (administrador)
router.delete('/:id', verifyToken, deleteVuelo);

module.exports = router;
