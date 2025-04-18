// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];          // debe venir "Bearer <token>"
  if (!authHeader) return res.status(403).json({ msg: 'Token requerido.' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ msg: 'Token malformado.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: 'Token inválido.' });
    // decoded tiene { id, correo, rol }
    req.user = decoded;
    next();
  });
};
