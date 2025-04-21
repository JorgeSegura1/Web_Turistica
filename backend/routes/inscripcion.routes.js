// backend/routes/inscripcion.routes.js
const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { inscribirVuelo } = require('../controllers/inscripcion.controller');
const router = express.Router();

// Ruta de diagnóstico
router.get('/_test', (req, res) => {
  return res.json({ ruta: 'inscripciones funcionando' });
});

// POST /api/inscripciones/:vueloId
router.post('/:vueloId', verifyToken, inscribirVuelo);

module.exports = router;
