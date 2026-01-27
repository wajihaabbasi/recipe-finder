const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Recipe Finder API is live');
});

//Use Recipe Route
const recipeRoutes = require('./routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);

//
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

//Adding Favourite 
const favoriteRoutes = require('./routes/favoriteRoutes');
app.use('/api/favorites', favoriteRoutes);

module.exports = app;