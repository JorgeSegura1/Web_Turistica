// backend/controllers/inscripcion.controller.js
const db = require('../config/db');

const inscribirVuelo = async (req, res) => {
  const { id: usuarioId, rol } = req.user;
  const { vueloId } = req.params;

  if (rol !== 'publico') {
    return res.status(403).json({ msg: 'Solo usuarios públicos pueden inscribirse a vuelos.' });
  }

  try {
    const [[vuelo]] = await db.query('SELECT cupos FROM vuelos WHERE id = ?', [vueloId]);
    if (!vuelo) return res.status(404).json({ msg: 'Vuelo no encontrado.' });
    if (vuelo.cupos <= 0) return res.status(400).json({ msg: 'No hay cupos disponibles.' });

    const [[yaInscrito]] = await db.query(
      'SELECT 1 FROM inscripciones WHERE usuario_id = ? AND vuelo_id = ?',
      [usuarioId, vueloId]
    );
    if (yaInscrito) return res.status(400).json({ msg: 'Ya estás inscrito en este vuelo.' });

    await db.query('INSERT INTO inscripciones (usuario_id, vuelo_id) VALUES (?, ?)', [usuarioId, vueloId]);
    await db.query('UPDATE vuelos SET cupos = cupos - 1 WHERE id = ?', [vueloId]);

    res.json({ msg: 'Inscripción realizada con éxito.' });
  } catch (error) {
    console.error('Error al inscribir vuelo:', error);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};

const obtenerVuelosInscritos = async (req, res) => {
  const { id: usuarioId } = req.user;

  try {
    const [vuelos] = await db.query(`
      SELECT v.id, v.lugar_salida, v.lugar_llegada, v.fecha, v.hora, v.cupos, v.comentario
      FROM inscripciones i
      JOIN vuelos v ON i.vuelo_id = v.id
      WHERE i.usuario_id = ?
      ORDER BY v.fecha DESC, v.hora DESC
    `, [usuarioId]);

    res.json(vuelos);
  } catch (error) {
    console.error('Error al obtener vuelos inscritos:', error);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};

module.exports = { inscribirVuelo, obtenerVuelosInscritos };
