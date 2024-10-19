
const { register } = require('module');
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, password: hashedPassword });
         
    
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

