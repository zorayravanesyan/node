const { Product } = require('../models');

//  Get All Products
const getAllProducts = async (req, res, next) => {
    try {
        let products;

        if (req.identity.is_admin) {
            products = await Product.findAll();
        } else {
            products = await Product.findAll({
                where: {
                    user_id: req.identity.id
                }
            });
        }

        res.json({ products });
    } catch (error) {
        next(error);
    }
};

// Create Product
const createProduct = async (req, res, next) => {
    const { name, ...otherFields } = req.body;

    if (!req.identity.is_admin) {
        return res.status(403).json({ error: 'Only admins can create products' });
    }

    try {
        const product = await Product.create({
            name,
            user_id: req.identity.id,
            ...otherFields,
        });

        res.status(201).json({ product });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    createProduct,
};
