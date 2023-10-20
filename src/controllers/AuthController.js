const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { generateVerifyCode } = require("../helpers/verify/verifyCode");
const Joi = require("@hapi/joi");
const { Op } = require("sequelize");
const Mailer = require("../helpers/mailer/Mailer");

const AuthController = {
  async register(req, res) {
    try {
      const { username, password, first_name, last_name, email, } = req.body;

      let user = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] },
      });

      if (user) {
        return res.status(409).json({ message: "User alredy exist" }); // Conflict error
      }


      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyCode = generateVerifyCode(1000, 9999);

      user = await User.create({
        ...req.body,
        password: hashedPassword,
        verify_code: verifyCode,
      });
      
      // await Mailer.sendVerificationMail(user);
      // await Mailer.registrationForAdmin(user);

      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { username, email, password } = req.body;

      const user = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] },
      });
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
