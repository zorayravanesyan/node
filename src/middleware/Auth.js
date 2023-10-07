const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decoded = await jwt.verify(token, 'secret');
  if(!decoded){
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if(!decoded.id){
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findByPk(decoded.id);

  if(!user){
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.identity = user;
  res.identity = user;

  next();
};

module.exports = authMiddleware;
