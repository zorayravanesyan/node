const { Book, User } = require("../models");
const { validationResult } = require("express-validator");

const BookController = {
  //  Get All Books
  async getAllBooks(req, res, next) {
    try {
      let where = {};

      if (!req.identity.is_admin) {
        where.user_id = req.identity.id;
      }
      const books = await Book.findAll({
        where: where,
        include: {
          model: User,
          as: "user",
          attributes: ["id", "username"],
        },
      });
      res.send(books);
    } catch (error) {
      next(error);
    }
  },

  // Get Book by  ID
  async getBookById(req, res, next) {
    try {
      const book = await Book.findByPk(req.params.id);

      if (!book) res.status(400).json("Book not found");
      res.send(book);
    } catch (error) {
      next(error);
    }
  },

  // Create Book
  async createBook(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, price } = req.body;

      if (!title || !description || !price) {
        return res.status(400).json("All fields are required");
      }
      const book = await Book.create({
        title,
        description,
        price,
        user_id: req.identity.id,
      });
      res.send(book);
    } catch (error) {
      next(error);
    }
  },

  // Update Book
  async updateBook(req, res, next) {
    try {
      const book = await Book.findOne({
        where: {
          id: req.params.id,
          user_id: req.identity.id,
        },
      });
      if (!book) throw new Error("book not found");
      await book.update(req.body);
      res.send(book);
    } catch (error) {
      next(error);
    }
  },

  // Delete Book
  async deleteBook(req, res, next) {
    try {
      const book = await Book.findOne({
        where: {
          id: req.params.id,
          user_id: req.identity.id,
        },
      });
      if (!book) throw new Error("book not found");
      await book.destroy();
      res.send(book);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = BookController;
