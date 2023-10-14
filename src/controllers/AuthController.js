const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { generateVerifyCode } = require("../helpers/verify/verifyCode");

const AuthController = {
  async register(req, res) {
    try {
      const { username, password, first_name, last_name } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: hashedPassword,
        first_name,
        last_name,
        verify_code: generateVerifyCode(),
      });

      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });

      res.json({
        token,
        code: user.verify_code,
        user
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(password);
      console.log(user.password);

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
      let retunredInfo = {
        id: user.id,
        username: user.username,
      };

      res.json({
        token,
        user: retunredInfo,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AuthController;
