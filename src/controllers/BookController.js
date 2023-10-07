const { Book, User } = require('../models');

//  Get All Books
const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.findAll({
            include: {
                model: User,
                as: "user",
                attributes: ["id", "username"]
            }
        });
        res.send(books);
    } catch (error) {
        next(error);
    }
};


// Get Book by  ID
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
       
        if (!book) res.status(400).json("Book not found");
        res.send(book);
    } catch (error) {
        next(error);
    }
};

// Create Book
const createBook = async (req, res, next) => {
    try {
        const { title, description, price } = req.body;

        if (!title || !description || !price) {
            return res.status(400).json("All fields are required");
        }
        const book = await Book.create({ title, description, price, user_id: req.identity.id });
        res.send(book);
    } catch (error) {
        next(error);
    }
};


// Update Book
const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) throw new Error('Книга не найдена');
        await book.update(req.body);
        res.send(book);
    } catch (error) {
        next(error);
    }
};

// Delete Book
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) throw new Error('Книга не найдена');
        await book.destroy();
        res.send(book);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};