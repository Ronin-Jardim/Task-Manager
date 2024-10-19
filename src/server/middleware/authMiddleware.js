

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

  module.exports =  { verifyToken};
