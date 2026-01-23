const pool = require('../config/db');

const addFavorite = async (req, res) => {
  const { spoonacular_id } = req.body;
  const user_id = req.user; // Obtained from the auth middleware

  try {
    const newFavorite = await pool.query(
      'INSERT INTO favorites (user_id, spoonacular_id) VALUES ($1, $2) RETURNING *',
      [user_id, spoonacular_id]
    );
    res.status(201).json(newFavorite.rows[0]);
  } catch (err) {
    if (err.code === '23505') {// violation error code
      return res.status(400).json({ error: "Recipe already in favorites" });
    }
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { addFavorite };
