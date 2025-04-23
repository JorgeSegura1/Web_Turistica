// backend/controllers/vuelos.controller.js
const db = require('../config/db');

const obtenerVuelos = async (req, res) => {
  try {
    const [vuelos] = await db.query(`
      SELECT v.*, u.nombre AS instructor
      FROM vuelos v
      JOIN usuarios u ON v.creado_por = u.id
      ORDER BY fecha DESC, hora DESC
    `);
    res.json(vuelos);
  } catch (error) {
    console.error('Error al obtener vuelos:', error);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};

const crearVuelo = async (req, res) => {
  try {
    const { lugar_salida, lugar_llegada, fecha, hora, cupos, comentario } = req.body;
    const { id: instructorId, rol } = req.user;

    if (rol !== 'instructor') {
      return res.status(403).json({ msg: 'Solo instructores pueden crear vuelos.' });
    }

    const sql = `
      INSERT INTO vuelos (lugar_salida, lugar_llegada, fecha, hora, cupos, comentario, creado_por)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [lugar_salida, lugar_llegada, fecha, hora, cupos, comentario, instructorId]);

    res.status(201).json({ msg: 'Vuelo creado exitosamente.', id: result.insertId });
  } catch (error) {
    console.error('Error al crear vuelo:', error);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};

const deleteVuelo = async (req, res) => {
  const { rol } = req.user;
  const { id } = req.params;

  if (rol !== 'administrador') {
    return res.status(403).json({ msg: 'Solo administradores pueden eliminar vuelos.' });
  }

  try {
    const [result] = await db.query('DELETE FROM vuelos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Vuelo no encontrado.' });
    }
    res.json({ msg: 'Vuelo eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar vuelo:', error);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};
// Actualizar un vuelo (solo administradores)
const actualizarVuelo = async (req, res) => {
  const { rol } = req.user;
  const { id } = req.params;
  const { lugar_salida, lugar_llegada, fecha, hora, cupos, comentario } = req.body;

  if (rol !== 'administrador') {
    return res.status(403).json({ msg: 'Solo administradores pueden editar vuelos.' });
  }

  try {
    const sql = `
      UPDATE vuelos
      SET lugar_salida = ?, lugar_llegada = ?, fecha = ?, hora = ?, cupos = ?, comentario = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [
      lugar_salida, lugar_llegada, fecha, hora, cupos, comentario, id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Vuelo no encontrado.' });
    }

    res.json({ msg: 'Vuelo actualizado correctamente.' });
  } catch (error) {
    console.error('Error al actualizar vuelo:', error);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};

module.exports = { obtenerVuelos, crearVuelo, deleteVuelo, actualizarVuelo, };
