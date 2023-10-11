const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const Auth = require('../middleware/Auth');

// Get All Products
router.get('/', Auth, ProductController.getAllProducts);

// Create Product (requires authentication)
router.post('/', Auth, ProductController.createProduct);

module.exports = router;
