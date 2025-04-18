// backend/controllers/vuelos.controller.js
const db = require('../config/db');

const crearVuelo = async (req, res) => {
  try {
    const { lugar_salida, lugar_llegada, fecha, hora, cupos } = req.body;
    const { id: instructorId, rol } = req.user;

    if (rol !== 'instructor') {
      return res.status(403).json({ msg: 'Solo instructores pueden crear vuelos.' });
    }

    if (!lugar_salida || !lugar_llegada || !fecha || !hora || cupos == null) {
      return res.status(400).json({ msg: 'Faltan campos obligatorios.' });
    }

    const cuposInt = parseInt(cupos, 10);
    if (isNaN(cuposInt) || cuposInt <= 0) {
      return res.status(400).json({ msg: 'Cupos inválidos.' });
    }

    const sql = `
      INSERT INTO vuelos (
        lugar_salida,
        lugar_llegada,
        fecha,
        hora,
        cupos,
        creado_por
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      lugar_salida,
      lugar_llegada,
      fecha,
      hora,
      cuposInt,
      instructorId
    ]);

    res.status(201).json({
      msg: 'Vuelo creado exitosamente.',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error al crear vuelo:', error);
    res.status(500).json({ msg: 'Error en el servidor.' });
  }
};

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

module.exports = { crearVuelo, obtenerVuelos };
