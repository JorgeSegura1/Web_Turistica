// backend/routes/comment.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createComment, getComments } = require('../controllers/comment.controller');

// POST /api/comments
router.post('/', verifyToken, createComment);

// GET  /api/comments
router.get('/', getComments);

module.exports = router;
