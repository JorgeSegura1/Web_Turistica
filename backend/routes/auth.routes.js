// backend/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');

// Ruta para registrar usuario
router.post('/register', registerUser);

// Ruta para login
router.post('/login', loginUser);

module.exports = router;
