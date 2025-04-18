// backend/controllers/inscripcion.controller.js
const db = require('../config/db');

exports.createInscripcion = async (req, res) => {
  try {
    const userId = req.user.id;
    const { deporteId } = req.body;   // llega desde el front

    if (!deporteId) {
      return res.status(400).json({ msg: 'Falta el ID de la actividad.' });
    }

    // Previene inscripciones duplicadas (opcional)
    const [exist] = await db.query(
      'SELECT * FROM inscripciones WHERE usuario_id = ? AND vuelo_id = ?',
      [userId, deporteId]
    );
    if (exist.length) {
      return res.status(409).json({ msg: 'Ya estás inscrito en este vuelo.' });
    }

    // Inserta la inscripcion
    await db.query(
      'INSERT INTO inscripciones (usuario_id, vuelo_id) VALUES (?, ?)',
      [userId, deporteId]
    );
    res.status(201).json({ msg: 'Inscripción creada.' });
  } catch (err) {
    console.error('Error en createInscripcion:', err);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};
