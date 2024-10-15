const express = require('express');
const app = express();

// Middleware to parse JSON data from the request body
app.use(express.json());

// Define the /baby/vaccination route
app.post('/baby/vaccination', (req, res) => {
  // Get vaccination details from the request body
  const { babyName, dateOfBirth, vaccinationType, vaccinationDate } = req.body;

  // Validate that all necessary fields are provided
  if (!babyName || !dateOfBirth || !vaccinationType || !vaccinationDate) {
    return res.status(400).send('Missing required fields.');
  }

  // Log the vaccination details
  console.log(`Vaccination record:`);
  console.log(`Baby Name: ${babyName}`);
  console.log(`Date of Birth: ${dateOfBirth}`);
  console.log(`Vaccination Type: ${vaccinationType}`);
  console.log(`Vaccination Date: ${vaccinationDate}`);

  // Send a response back
  res.send(`Vaccination details for ${babyName} have been logged.`);
});

// Set up the server to listen on a port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
