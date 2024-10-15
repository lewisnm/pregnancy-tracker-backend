const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.json());

// Secret key for JWT
const JWT_SECRET = 'your-secret-key';

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect('<YOUR_CONNECTION_STRING>', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define User Schema and Model (for parents)
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Define Milestone Schema and Model (for baby milestones)
const milestoneSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to the user (parent)
  babyName: String, // Baby's name
  milestoneType: String, // Type of milestone (e.g., 'eating', 'crawling')
  date: { type: Date, required: true }, // Date when the milestone occurred
  description: String, // Additional details about the milestone
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

// Register route for parents
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('All fields are required.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).send('User registered successfully.');
  } catch (err) {
    res.status(500).send('Error creating user.');
  }
});

// Login route for parents (returns JWT)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('User not found.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send('Invalid credentials.');
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied.');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token.');
    req.user = user;
    next();
  });
};

// Route to create a milestone
app.post('/milestones', authenticateToken, async (req, res) => {
  const { babyName, milestoneType, date, description } = req.body;

  if (!babyName || !milestoneType || !date) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const newMilestone = await Milestone.create({
      userId: req.user.userId,
      babyName,
      milestoneType,
      date: new Date(date), // Make sure the date is valid
      description,
    });

    res.status(201).send('Milestone recorded successfully.');
  } catch (err) {
    res.status(500).send('Error recording milestone.');
  }
});

// Route to get all milestones for a parent’s baby
app.get('/milestones/:babyName', authenticateToken, async (req, res) => {
  const { babyName } = req.params;

  try {
    const milestones = await Milestone.find({ userId: req.user.userId, babyName });

    if (milestones.length === 0) {
      return res.status(404).send('No milestones found for this baby.');
    }

    res.json(milestones);
  } catch (err) {
    res.status(500).send('Error fetching milestones.');
  }
});

// Route to update a specific milestone
app.put('/milestones/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { milestoneType, date, description } = req.body;

  try {
    const updatedMilestone = await Milestone.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { milestoneType, date: new Date(date), description },
      { new: true }
    );

    if (!updatedMilestone) return res.status(404).send('Milestone not found.');

    res.json(updatedMilestone);
  } catch (err) {
    res.status(500).send('Error updating milestone.');
  }
});

// Route to delete a specific milestone
app.delete('/milestones/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMilestone = await Milestone.findOneAndDelete({ _id: id, userId: req.user.userId });

    if (!deletedMilestone) return res.status(404).send('Milestone not found.');

    res.send('Milestone deleted successfully.');
  } catch (err) {
    res.status(500).send('Error deleting milestone.');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
