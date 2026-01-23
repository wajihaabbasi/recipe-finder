const axios = require('axios');

// Fetch recipes from Spoonacular
const searchRecipes = async (req, res) => {
  try {
    const { query } = req.query; 
    const apiKey = process.env.SPOONACULAR_API_KEY;

    if (!query) {
      return res.status(400).json({
         error: "Search query is required" 
        });
    }

    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query: query,
        apiKey: apiKey,
        number: 10 
      }
    });

    res.json(response.data);
  }  
  catch (error) {
        res.status(500).json({ 
        error: "Failed to fetch recipes" 
    });
  }
};

//To fetch recipe details from spoonacular
const getRecipeDetails = async (req,res) =>{
    const { id } = req.params;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      { params: { apiKey } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Spoonacular Detail Error:", error.message);
    res.status(500).json({ 
        error: "Failed to fetch recipe details" 
    });
  }
};

module.exports = {
  searchRecipes,
  getRecipeDetails
};