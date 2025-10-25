// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
    res.send('Recipe Finder Backend is running!');
});

// Define the port from environment variables or use 3000 as default
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});