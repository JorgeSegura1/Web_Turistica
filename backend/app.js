// backend/app.js
const express = require('express');
const cors = require('cors');

const authRoutes        = require('./routes/auth.routes');
const commentRoutes     = require('./routes/comment.routes');
const vuelosRoutes      = require('./routes/vuelos.routes');
const inscripcionesRoutes = require('./routes/inscripcion.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTAS API
app.use('/api/auth',        authRoutes);
app.use('/api/comments',    commentRoutes);
app.use('/api/vuelos',      vuelosRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);

// ESTA ES TU PÁGINA RAÍZ
app.get('/', (req, res) => res.send('API funcionando correctamente'));

// —> 404: SIEMPRE AL FINAL
app.use((req, res) => 
  res.status(404).json({ msg: 'Ruta no encontrada' })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
