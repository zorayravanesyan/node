
const { Book, User } = require('../models');
const { validationResult } = require('express-validator');
// const { validateBook } = require('../valodators/bookValidator');


//  Get All Books
const getAllBooks = async (req, res, next) => {
    try {
        if(req.identity.is_admin){
            const books = await Book.findAll({
                include: {
                    model: User,
                    as: "user",
                    attributes: ["id", "username"]
                }
            });
            res.send(books)
        }
        const books = await Book.findAll({
            where:{
                user_id: req.identity.id
            },

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


// const getAllBooks = async (req, res, next) => {
//     try {
//         let books;

//         if (req.identity.is_admin) {
//             books = await bookRepository.getAllBooksForAdmin();
//         } else {
//             books = await bookRepository.getAllBooksForUser(req.identity.id);
//         }

//         res.send(books);
//     } catch (error) {
//         next(error);
//     }
// };



// const getAllBooksForUser = async (userId) => {
//     return await Book.findAll({
//         where: {
//             user_id: userId
//         },
//         include: {
//             model: User,
//             as: "user",
//             attributes: ["id", "username"]
//         }
//     });
// };

// const getAllBooksForAdmin = async () => {
//     return await Book.findAll({
//         include: {
//             model: User,
//             as: "user",
//             attributes: ["id", "username"]
//         }
//     });
// };




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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
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
        const book = await Book.findOne({
            where:{
                id: req.params.id,
                user_id: req.identity.id
            }
        });
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
        const book = await Book.findOne({
            where:{
                id: req.params.id,
                user_id: req.identity.id
            }
        });
        if (!book) throw new Error('Книга не найдена');
        await book.destroy();
        res.send(book);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    // getAllBooksForUser,
    // getAllBooksForAdmin,
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
    // validateBook
};