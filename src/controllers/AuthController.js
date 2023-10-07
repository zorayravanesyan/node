

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const AuthController = {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      if(!username || !password){
        throw new Error("username or password required");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ username, password: hashedPassword });

      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;
      if(!username || !password){
        throw new Error("username or password required");
      }

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log(password);
      console.log(user.password);

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = AuthController;
