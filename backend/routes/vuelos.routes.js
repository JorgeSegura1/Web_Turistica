// backend/routes/vuelos.routes.js
const express = require('express');
const router = express.Router();

// Middleware de autenticación
const { verifyToken } = require('../middleware/auth');

// Controladores
const {
  obtenerVuelos,
  crearVuelo,
  deleteVuelo,
  actualizarVuelo,
} = require('../controllers/vuelos.controller');

// Listar vuelos (cualquiera autenticado)
router.get('/', verifyToken, obtenerVuelos);

// Crear vuelo (solo instructor)
router.post('/', verifyToken, crearVuelo);

// Editar vuelo (solo administrador)
router.put('/:id', verifyToken, actualizarVuelo);

// Eliminar vuelo (solo administrador)
router.delete('/:id', verifyToken, deleteVuelo);

module.exports = router;
