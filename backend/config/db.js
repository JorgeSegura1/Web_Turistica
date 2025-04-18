const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'parapente_db'
});

const promisePool = pool.promise(); // <-- Esto ya no da error

module.exports = promisePool;
