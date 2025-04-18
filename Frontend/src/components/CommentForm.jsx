import React, { useState, useEffect } from 'react';
import './CommentForm.css';

export default function CommentForm() {
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [comments, setComments] = useState([]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetch('http://localhost:5000/api/comments')
      .then(res => res.json())
      .then(setComments)
      .catch(console.error);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ texto }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      setSuccess('Comentario publicado');
      setTexto('');
      setComments(prev => [{ ...data.comentario, nombre: '', apellido: '' }, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (role !== 'instructor') {
    return (
      <div className="comment-section">
        <h3 className="comment-title">Comentarios</h3>
        {comments.map(c => (
          <div key={c.id} className="comment">
            <p><strong>{c.nombre} {c.apellido}</strong>: {c.texto}</p>
            <small className="comment-date">{new Date(c.fecha).toLocaleString()}</small>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="comment-form-container">
      <h3 className="comment-title">Publicar comentario</h3>
      {error && <p className="comment-error">{error}</p>}
      {success && <p className="comment-success">{success}</p>}

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          className="comment-textarea"
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Escribe tu comentario..."
          rows={3}
          required
        />
        <button type="submit" className="comment-button">Enviar</button>
      </form>

      <hr className="comment-divider" />
      <h3 className="comment-title">Comentarios</h3>
      {comments.map(c => (
        <div key={c.id} className="comment">
          <p><strong>{c.nombre} {c.apellido}</strong>: {c.texto}</p>
          <small className="comment-date">{new Date(c.fecha).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
