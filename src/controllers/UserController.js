const { generateVerifyCode } = require("../helpers/verify/verifyCode");
const { User, Book, Product } = require("../models");
const bcrypt = require("bcryptjs");

//Create All Users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Book,
          as: "book",
          attributes: ["id", "title", "description", "price"],
        },
        {
          model: Product,
          as: "products",
          attributes: ["id", "name", "price"],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    });

    res.send(users);
  } catch (error) {
    next(error);
  }
};

//Create User By Id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Book,
            as: "book",
            attributes: ["id", "title", "description", "price"],
          },
          {
            model: Product,
            as: "products",
            attributes: ["id", "name", "price"],
          },
        ],
        attributes: { 
          exclude: ["password"] 
        }
      }
    );
    if (!user) throw new Error("User not found");
    res.send(user);
  } catch (error) {
    next(error);
  }
};

//Create User
const createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, username, password, is_admin } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      username,
      password: hashedPassword,
      is_admin,
      verify_code: generateVerifyCode(1000, 9999),
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
};

// Update User
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new Error("User not found");
    await user.update(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// Delete User
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { code } = req.body;
    let auth = req.identity;
    console.log(auth.verify_code);
    if (code !== auth.verify_code) {
      throw new Error("Code is wrong");
    }

    await auth.update({
      verify_code: null,
      is_verified: true,
    });

    res.send(true);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  // validateUser
};
