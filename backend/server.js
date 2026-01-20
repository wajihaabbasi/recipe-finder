const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

// Test DB connection before starting server
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database Connected:', res.rows[0].now);
    app.listen(PORT, () => {
      console.log(` Server running on PORT: ${PORT}`);
    });
  }
});