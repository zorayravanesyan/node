const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const Auth = require("../middleware/Auth");
const isAdmin = require("../middleware/Admin");
const verified = require("../middleware/verified");
// Get All Products
router.get("/", verified, ProductController.getAllProducts);

// Get Product by ID
router.get("/:id",  verified, ProductController.getProductById);


// Create Product (requires authentication)
router.post("/", Auth, isAdmin, verified, ProductController.createProduct);


// Update Product (requires authentication)
router.put("/:id", Auth, verified, ProductController.updateProduct);


// Delete Product (requires authentication)
router.delete("/:id", Auth, verified, ProductController.deleteProduct);

module.exports = router;