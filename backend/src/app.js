const express = require('express');
const cors = require('cors');
require('dotenv').config();
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (We will add these soon)
app.get('/', (req, res) => {
  res.send('Recipe Finder API is live');
});

//Use Recipe Route
app.use('/api/recipes', recipeRoutes);

app.get('/', (req, res) => {
  res.send('Recipe Finder API is live');
});

module.exports = app;