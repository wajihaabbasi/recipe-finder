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
  }  catch (error) {
    // 1. ADD THIS: Log the detailed error from Spoonacular
    if (error.response) {
      console.error("Spoonacular API Error:", error.response.status, error.response.data);
    } else {
      console.error(" Network/Request Error:", error.message);
    }
    
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
// ...
};

module.exports = {
  searchRecipes
};