const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');


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


app.use('/api/users', userRoutes);

module.exports = app;