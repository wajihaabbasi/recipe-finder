const pool = require('../config/db');

// to favorite a recipe
const addFavorite = async (req, res) => {
  const { spoonacular_id } = req.body;
  const user_id = req.user; // Obtained from the auth middleware

  try {
    const newFavorite = await pool.query(
      'INSERT INTO favorites (user_id, spoonacular_id) VALUES ($1, $2) RETURNING *',
      [user_id, spoonacular_id]
    );
    res.status(201).json(newFavorite.rows[0]);
  } catch (error) {
    if (error.code === '23505') {// violation error code
      return res.status(400).json({ error: "Recipe already in favorites" });
    }
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//get all favorited recipes
const getFavorites = async (req, res) => {
  const user_id = req.user;

  try {
    const favorites = await pool.query(
      'SELECT spoonacular_id FROM favorites WHERE user_id = $1 ORDER BY saved_at DESC', [user_id]
          );
          res.json(favorites.rows);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    
  }
};

// remove a favorited recipe

const removeFavorite = async (req,res) =>{
  const {spoonacular_id} = req.params;
  const user_id = req.user;

try {
  const result = await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND spoonacular_id = $2',
      [user_id, spoonacular_id]
    );

   if (result.rowCount === 0) {
    return res.status(404).json({
      error: "No Favorites"
    });
   } 
  res.json({
    message: "Favorite Removed"
  });

} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  
}
};

module.exports = { 
  addFavorite,
  getFavorites,
  removeFavorite
 };
