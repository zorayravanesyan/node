const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const Auth = require('../middleware/Auth');
const bookValidator = require('../Joi/bookValidator');
const JoiMid = require('./../middleware/JoiMid')
const isAdmin = require('../middleware/Admin');
const verified = require('../middleware/verified')

// Get All Books
router.get('/', Auth, isAdmin,verified, BookController.getAllBooks);

// Get Book by ID
router.get('/:id',  verified, BookController.getBookById);

// Create Book (requires authentication)
router.post('/', Auth,  verified,JoiMid.req(bookValidator.bookSchema), BookController.createBook);

// Update Book (requires authentication)
router.put('/:id', Auth,  verified,JoiMid.req(bookValidator.bookSchema), BookController.updateBook);

// Delete Book (requires authentication)
router.delete('/:id', Auth, verified, BookController.deleteBook);

module.exports = router;


// Auth պարտադիր login պետք է եղած լինես