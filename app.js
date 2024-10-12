const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//load environment variables from .env file
dotenv.config();

//connect to mongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// middleware to parse incoming json data
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to the Pregnancy Tracker API');
});

app.listen(port, () => {
	console.log('Server running on port ${port}');
});
