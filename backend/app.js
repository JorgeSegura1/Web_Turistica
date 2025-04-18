// backend/app.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const authRoutes        = require('./routes/auth.routes');
const commentRoutes     = require('./routes/comment.routes');
const vuelosRoutes      = require('./routes/vuelos.routes');
const inscripcionRoutes = require('./routes/inscripcion.routes');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',        authRoutes);
app.use('/api/comments',    commentRoutes);
app.use('/api/vuelos',      vuelosRoutes);
app.use('/api/inscripcion', inscripcionRoutes);

app.get('/', (req, res) => res.send('API funcionando correctamente'));

// 404 handler
app.use((req, res) => res.status(404).json({ msg: 'Ruta no encontrada' }));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
