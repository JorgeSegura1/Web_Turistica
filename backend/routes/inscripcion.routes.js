// backend/routes/inscripcion.routes.js
const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { inscribirVuelo, obtenerVuelosInscritos } = require('../controllers/inscripcion.controller');
const router = express.Router();

// Ruta de diagnóstico
router.get('/_test', (req, res) => {
  return res.json({ ruta: 'inscripciones funcionando' });
});

// Ruta para obtener vuelos inscritos
router.get('/', verifyToken, obtenerVuelosInscritos);

// POST /api/inscripciones/:vueloId
router.post('/:vueloId', verifyToken, inscribirVuelo);

module.exports = router;
