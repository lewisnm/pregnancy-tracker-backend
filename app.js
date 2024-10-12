const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

//load environment variables from .env file
dotenv.config();

//connect to mongoDB
connectDB();

// Use the user routes
app.use('/api/users', userRoutes);

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
