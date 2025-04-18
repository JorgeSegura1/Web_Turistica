// backend/routes/inscripcion.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createInscripcion } = require('../controllers/inscripcion.controller');

// POST /api/inscripcion
router.post('/', verifyToken, createInscripcion);

module.exports = router;
