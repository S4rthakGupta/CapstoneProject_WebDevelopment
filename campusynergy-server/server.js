const express = require('express');
const connectDB = require('./config/db');  // Import MongoDB connection function
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();

// Connect to MongoDB
connectDB();  // Calls the function in db.js to establish the database connection

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Allows parsing JSON request bodies

// Routes
app.use('/api/users', require('./routes/userRoutes')); // Load user routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
