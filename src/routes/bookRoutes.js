const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const Auth = require('../middleware/Auth');
const { validateCreateUpdateBook, validateBookId } = require('../valodators/bookValidator');


// Get All Books
router.get('/', Auth, BookController.getAllBooks);

// Get Book by ID
router.get('/:id', BookController.getBookById);

// Create Book (requires authentication)
router.post('/', Auth, validateCreateUpdateBook, BookController.createBook);

// Update Book (requires authentication)
router.put('/:id', Auth,  BookController.updateBook);

// Delete Book (requires authentication)
router.delete('/:id', Auth,  BookController.deleteBook);

module.exports = router;


// Auth պարտադիր login պետք է եղած լինես