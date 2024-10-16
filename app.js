const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

//load environment variables from .env file
dotenv.config();

//connect to mongoDB
connectDB();

// middleware to parse incoming json data
app.use(express.json());

const port = process.env.PORT || 5000;

// Use the user routes
app.use('/api/users', userRoutes);

//pregnancy route
app.use('/api/pregnancy', require('./routes/pregnancyRoutes'));

// Default route for the root
app.get('/', (req, res) => {
	res.send('Welcome to the Pregnancy Tracker API');
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
	  console.log(`Server running on port ${port}`);
	});
  }

module.exports = app;