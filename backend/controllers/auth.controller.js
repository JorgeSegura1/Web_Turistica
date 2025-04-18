// backend/controllers/auth.controller.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

// Registro de usuario (para referencia)
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, pais, prefijo, numero, contrasena } = req.body;

    if (!nombre || !apellido || !correo || !pais || !prefijo || !numero || !contrasena) {
      return res.status(400).json({ msg: "Faltan datos requeridos." });
    }

    // Generar hash de la contraseña
    const hash = await bcrypt.hash(contrasena, saltRounds);

    const sql = `
      INSERT INTO usuarios (nombre, apellido, correo, pais, prefijo, numero, contrasena, rol)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [nombre, apellido, correo, pais, prefijo, numero, hash, 'publico']);
    console.log("Usuario registrado correctamente:", result);
    return res.status(200).json({ msg: "Registro exitoso" });
  } catch (error) {
    console.error("Error en registerUser:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ msg: "El correo ya está registrado." });
    }
    return res.status(500).json({ msg: "Error al registrar usuario." });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ msg: "Faltan datos para iniciar sesión." });
    }

    // Buscar usuario en la base de datos por correo
    const [results] = await db.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);

    if (results.length === 0) {
      return res.status(401).json({ msg: "Usuario no encontrado." });
    }

    const user = results[0];

    // Comparar contraseña ingresada con el hash guardado
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ msg: "Contraseña incorrecta." });
    }

    // Generar token JWT con datos básicos del usuario
    const token = jwt.sign(
      { id: user.id, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Opcional: mostrar en consola lo que se envía al frontend para debug
    const responseData = {
      msg: "Inicio de sesión exitoso",
      token,
      rol: user.rol,
    };
    console.log("Datos enviados al Frontend:", responseData);

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).json({ msg: "Error en el servidor." });
  }
};

module.exports = { registerUser, loginUser };
