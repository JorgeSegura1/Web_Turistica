// backend/controllers/comment.controller.js
const db = require('../config/db');

exports.createComment = async (req, res) => {
  try {
    const { texto } = req.body;
    const { id: userId, rol } = req.user;

    if (rol !== 'instructor') {
      return res.status(403).json({ msg: 'Solo instructores pueden publicar comentarios.' });
    }

    const sql = 'INSERT INTO comentarios (texto, creado_por) VALUES (?, ?)';
    const [result] = await db.query(sql, [texto, userId]);

    res.status(201).json({
      msg: 'Comentario creado.',
      comentario: { id: result.insertId, texto, creado_por: userId, fecha: new Date().toISOString() }
    });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, c.texto, c.fecha, u.nombre, u.apellido
      FROM comentarios c
      JOIN usuarios u ON c.creado_por = u.id
      ORDER BY c.fecha DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};
