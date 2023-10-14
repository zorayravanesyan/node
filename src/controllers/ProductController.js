const { Product, User } = require("../models");

//  Get All Products
const getAllProducts = async (req, res, next) => {
  try {
    let products;
    if (req.identity.is_admin) {
      products = await Product.findAll({
        include: {
          model: User,
          as: "user",
          attributes: [ "username"],
        },
      });
    } 
    // else {
    //   products = await Product.findAll({
    //     where: {
    //       user_id: req.identity.id,
    //     },
    //     include: {
    //       model: User,
    //       as: "user",
    //       attributes: ["id", "username"],
    //     },
    //   });
    // }

    res.send({ products });
  } catch (error) {
    next(error);
  }
};

// Get Product by  ID
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
       
        if (!product) res.status(400).json("product not found");
        res.send(product);
    } catch (error) {
        next(error);
    }
};


// Create Product
const createProduct = async (req, res, next) => {
  const { name, price } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      user_id: req.identity.id,
    });

    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }


  
};


// Update Product
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where:{
                id: req.params.id,
                user_id: req.identity.id
            }
        });
        if (!product) throw new Error('product not found');
        await product.update(req.body);
        res.send(product);
    } catch (error) {
        next(error);
    }
};




// Delete Product


const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where:{
                id: req.params.id,
                user_id: req.identity.id
            }
        });
        if (!product) throw new Error('product not found');
        await product.destroy();
        res.send(product);
    } catch (error) {
        next(error);
    }
};
module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById
};
