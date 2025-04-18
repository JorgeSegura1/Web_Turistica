// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // "Bearer <token>"
  if (!authHeader) return res.status(403).json({ msg: 'Token requerido.' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ msg: 'Token malformado.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: 'Token inválido.' });
    req.user = decoded;  // { id, correo, rol }
    next();
  });
};

module.exports = { verifyToken };
