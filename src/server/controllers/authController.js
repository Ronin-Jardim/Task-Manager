
const verifyToken = require("../middleware/authMiddleware");

const verify = (req, res) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return res.status(403).json({ error: 'Token verification failed' });
        }
        res.status(200).json({ message: 'Welcome to the dashboard!' });
    });
};

module.exports = { verify };
