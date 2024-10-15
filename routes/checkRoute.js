const express = require('express');
const cron = require('node-cron');
const app = express();

app.use(express.json());

let babyData = {}; // A place to store baby data and check-up info

// Register baby details and check-up schedule
app.post('/baby/register', (req, res) => {
  const { babyName, dateOfBirth, momEmail, checkupInterval } = req.body;

  if (!babyName || !dateOfBirth || !momEmail || !checkupInterval) {
    return res.status(400).send('Missing required fields.');
  }

  // Save baby info
  babyData[babyName] = {
    dateOfBirth,
    momEmail,
    checkupInterval, // The interval in which the baby needs to be checked up (in days, weeks, months, etc.)
    lastCheckupDate: new Date().toISOString() // This could be updated after every check-up
  };

  res.send(`Baby ${babyName} has been registered with a check-up interval of ${checkupInterval}.`);
});

// Schedule a task to check for babies needing a check-up
cron.schedule('* * * * *', () => {  // Runs every minute for demonstration; adjust timing as needed
  const currentDate = new Date();

  Object.keys(babyData).forEach(baby => {
    const babyInfo = babyData[baby];
    const lastCheckup = new Date(babyInfo.lastCheckupDate);
    const checkupInterval = babyInfo.checkupInterval;

    // Calculate next check-up date
    const nextCheckupDate = new Date(lastCheckup);
    nextCheckupDate.setDate(nextCheckupDate.getDate() + checkupInterval);

    if (currentDate >= nextCheckupDate) {
      // Send a reminder (for now, we just log it)
      console.log(`Reminder: Baby ${baby} needs a check-up! Sending reminder to ${babyInfo.momEmail}`);
      
      // Update last check-up date after reminder is sent
      babyInfo.lastCheckupDate = currentDate.toISOString();
    }
  });
});

// Set up the server to listen on a port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
