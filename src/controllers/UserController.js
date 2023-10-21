const { generateVerifyCode } = require("../helpers/verify/verifyCode");
const { User, Book, Product, sequelize } = require("../models");
const bcrypt = require("bcryptjs");
const transporter = require("../helpers/mailer/nodemailerConfig");
const { Op } = require("sequelize");
const Mailer = require("../helpers/mailer/Mailer");

const UserController = {
  // Create All Users
  // async getAllUsers(req, res, next) {
  //   try {
  //     const searchTerm = req.query.search;
  //     let where = {};
  //     if (searchTerm) {
  //       where[Op.or] = [
  //         { first_name: { [Op.iLike]: `%${searchTerm}%` } },
  //         { last_name: { [Op.iLike]: `%${searchTerm}%` } },
  //       ];
  //     }

  //     const users = await User.findAll({
  //       where: where,
  //       include: [
  //         {
  //           model: Book,
  //           as: "book",
  //           attributes: ["id", "title", "description", "price"],
  //         },
  //         {
  //           model: Product,
  //           as: "products",
  //           attributes: ["id", "name", "price"],
  //         },
  //       ],
  //       attributes: {
  //         exclude: ["password"],
  //       },
  //     });

  //     res.send(users);
  //   } catch (error) {
  //     next(error);
  //   }
  // },

    //   const query = `
    //   SELECT users.*, 
            //  books.id,
            //  books.title,
            //  books.description, 
            //  books.price,
            //  products.id, 
            //  products.name, 
            //  products.price
    //   FROM users
    //   LEFT JOIN books ON users.id = books.user_id
    //   LEFT JOIN products ON users.id = products.user_id
    //   ${
    //     searchTerm
    //       ? "WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR username ILIKE $1"
    //       : ""
    //   }
    // `;

  async getAllUsers(req, res, next) {
    try {
      const searchTerm = req.query.search;

      const query = `
      SELECT 
          users.id,
          users.first_name,
          users.last_name,
          users.username,
          books.id AS book_id,
          books.title AS book_title,
          books.description AS book_description,
          books.price AS book_price,
          products.id AS product_id,
          products.name AS product_name,
          products.price AS product_price
      FROM users
      LEFT JOIN books ON users.id = books.user_id
      LEFT JOIN products ON users.id = products.user_id
      ${searchTerm ? 'WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR username ILIKE $1' : ''}
      ORDER BY users.id
  `;
  
  
  
      const values = searchTerm ? [`%${searchTerm}%`] : [];

      const [result] = await sequelize.query(query, values);
      const users = result.map((row) => {
        const user = { ...row };

        user.book = [];
        user.products = [];

        if (row.book_id !== null) {
          user.book.push({
            id: row.book_id,
            title: row.book_title,
            description: row.book_description,
            price: row.book_price,
          });
        }

        if (row.product_id !== null) {
          user.products.push({
            id: row.product_id,
            name: row.product_name,
            price: row.product_price,
          });
        }

        delete user.book_id;
        delete user.book_title;
        delete user.book_description;
        delete user.book_price;

        delete user.product_id;
        delete user.product_name;
        delete user.product_price;

        return user;
      });

      res.send(users);
    } catch (error) {
      next(error);
    }
  },

  //Create User By Id
  async getUserById(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [
          {
            model: Book,
            as: "book",
            attributes: ["id", "title", "description", "price"],
            required: false,
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
      if (!user) throw new Error("User not found");
      res.send(user);
    } catch (error) {
      next(error);
    }
  },

  async createUser(req, res, next) {
    try {
      const { username, email, password } = req.body;

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

      // Send an email with a verification code
      await Mailer.sendVerificationMail(user);

      res.send(true);
    } catch (error) {
      next(error);
    }
  },

  // Update User
  async updateUser(req, res, next) {
    try {
      if (!req.identity.is_admin && req.identity.id !== req.params.id) {
        return res
          .status(403)
          .json({ message: "Cannot update another account" }); // 403 forbiden, zapreshoni
      }
      const user = await User.findByPk(req.params.id);
      if (!user) throw new Error("User not found");
      await user.update(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },

  // Delete User
  async deleteUser(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) throw new Error("User not found");
      await user.destroy();
      res.send(user);
    } catch (error) {
      next(error);
    }
  },

  async verifyUser(req, res, next) {
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
  },
};

module.exports = UserController;
