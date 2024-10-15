const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware to parse JSON and handle authentication
app.use(express.json());

// Secret key for JWT
const JWT_SECRET = 'your-secret-key';

// MongoDB Connection (Replace <YOUR_CONNECTION_STRING> with MongoDB URI)
mongoose.connect('<YOUR_CONNECTION_STRING>', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Define Health Record Schema and Model
const healthRecordSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Associate record with a user
  type: String, // e.g., 'doctor_note', 'prescription', 'medical_history'
  content: String, // Record content (can be doctor's note, prescription details)
  date: { type: Date, default: Date.now },
});

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

// Register route for creating a new user
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

// Login route for user authentication (returns JWT token)
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

// Middleware to verify JWT and protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied.');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token.');
    req.user = user;
    next();
  });
};

// Route to create a health record
app.post('/health-record', authenticateToken, async (req, res) => {
  const { type, content } = req.body;

  if (!type || !content) {
    return res.status(400).send('Type and content are required.');
  }

  try {
    const newRecord = await HealthRecord.create({
      userId: req.user.userId,
      type,
      content,
    });
    res.status(201).send('Health record created successfully.');
  } catch (err) {
    res.status(500).send('Error creating health record.');
  }
});

// Route to get all health records for the authenticated user
app.get('/health-records', authenticateToken, async (req, res) => {
  try {
    const records = await HealthRecord.find({ userId: req.user.userId });
    res.json(records);
  } catch (err) {
    res.status(500).send('Error fetching records.');
  }
});

// Route to update a specific health record
app.put('/health-record/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { type, content } = req.body;

  try {
    const updatedRecord = await HealthRecord.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { type, content },
      { new: true }
    );
    if (!updatedRecord) return res.status(404).send('Record not found.');
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).send('Error updating record.');
  }
});

// Route to delete a specific health record
app.delete('/health-record/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await HealthRecord.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!deletedRecord) return res.status(404).send('Record not found.');
    res.send('Record deleted successfully.');
  } catch (err) {
    res.status(500).send('Error deleting record.');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
