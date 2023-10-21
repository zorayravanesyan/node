const jwt = require('jsonwebtoken');
const { User } = require('../models');

const Auth = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization_token;// headers-ը օգյեկտա որի մեջ authorization key-ավ կգա token-ը
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(token, "tokentokentokentokentokentoken");
    const decoded = await jwt.verify(token, 'secret'); 
    console.log('===============================================');
    if(!decoded){
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    if(!decoded.id){
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const user = await User.findByPk(decoded.id,{
      attributes: {
        exclude: ["password"]
      }
    });
  
    if(!user){
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    req.identity = user;
  
    next();
  } catch (error) {
    next(error)
  }
};

module.exports = Auth;
