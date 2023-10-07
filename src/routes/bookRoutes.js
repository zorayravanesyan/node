const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const Auth = require('../middleware/Auth');

// Get All Books
router.get('/', BookController.getAllBooks);

// Get Book by ID
router.get('/:id', BookController.getBookById);

// Create Book (requires authentication)
router.post('/', Auth, BookController.createBook);

// Update Book (requires authentication)
router.put('/:id', Auth, BookController.updateBook);

// Delete Book (requires authentication)
router.delete('/:id', Auth, BookController.deleteBook);

module.exports = router;
