const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

//Register a new User
router.post('/register', async (req, res) => {
    const {name, email, password } = req.body;

    try {
        //check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //Hash the password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const user = new User ({
            name,
            email,
            password: hashedpassword,
        })

        //Save user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;