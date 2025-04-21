// backend/controllers/inscripcion.controller.js
const db = require('../config/db');

async function inscribirVuelo(req, res) {
  const { id: usuarioId, rol } = req.user;
  const { vueloId } = req.params;

  if (rol !== 'publico') {
    return res
      .status(403)
      .json({ msg: 'Solo usuarios públicos pueden inscribirse a vuelos.' });
  }

  try {
    // 1) ¿Existe el vuelo y tiene cupos?
    const [[vuelo]] = await db.query(
      'SELECT cupos FROM vuelos WHERE id = ?',
      [vueloId]
    );
    if (!vuelo) return res.status(404).json({ msg: 'Vuelo no encontrado.' });
    if (vuelo.cupos <= 0)
      return res.status(400).json({ msg: 'No hay cupos disponibles.' });

    // 2) ¿Ya está inscrito?
    const [[yaInscrito]] = await db.query(
      'SELECT 1 FROM inscripciones WHERE usuario_id = ? AND vuelo_id = ?',
      [usuarioId, vueloId]
    );
    if (yaInscrito)
      return res
        .status(400)
        .json({ msg: 'Ya estás inscrito en este vuelo.' });

    // 3) Crear inscripción y descontar cupo
    await db.query(
      'INSERT INTO inscripciones (usuario_id, vuelo_id) VALUES (?, ?)',
      [usuarioId, vueloId]
    );
    await db.query(
      'UPDATE vuelos SET cupos = cupos - 1 WHERE id = ?',
      [vueloId]
    );

    return res.json({ msg: 'Inscripción realizada con éxito.' });
  } catch (err) {
    console.error('Error inscribirVuelo:', err);
    return res.status(500).json({ msg: 'Error interno del servidor.' });
  }
}

module.exports = { inscribirVuelo };
