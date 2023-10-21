const Joi = require('@hapi/joi');


const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().integer()
});

module.exports = {
    productSchema
};
