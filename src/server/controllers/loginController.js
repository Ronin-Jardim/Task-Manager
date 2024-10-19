
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');

exports.loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
       
        if (!userName || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '5h' });

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  

}
