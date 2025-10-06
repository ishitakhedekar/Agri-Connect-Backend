// Load environment variables from .env file 
require('dotenv').config({ quiet: true });

// Import dependencies
const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection
const cors = require("cors");

// Create express app
const app = express();

// Connect to MongoDB 
connectDB();

// Middleware to parse JSON body from requests
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000" // allow your frontend to connect
}));

// Import routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/lands", require("./routes/landRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
 
// Basic test route
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

// Use port from .env or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});   
