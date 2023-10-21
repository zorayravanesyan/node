const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const Auth = require("../middleware/Auth");
const JoiMid = require('./../middleware/JoiMid')
const isAdmin = require("../middleware/Admin");
const verified = require("../middleware/verified");
const productValidator = require('./../Joi/productValidator')

// Get All Products
router.get("/", Auth, isAdmin, verified, ProductController.getAllProducts);

// Get Product by ID
router.get("/:id", Auth, isAdmin, verified, ProductController.getProductById);


// Create Product (requires authentication)
router.post("/", Auth, isAdmin,  verified, ProductController.createProduct);


// Update Product (requires authentication)
router.put("/:id", Auth, isAdmin, verified,JoiMid.req(productValidator.productSchema), ProductController.updateProduct);


// Delete Product (requires authentication)
router.delete("/:id", Auth, isAdmin, verified, JoiMid.req(productValidator.productSchema),ProductController.deleteProduct);

module.exports = router;