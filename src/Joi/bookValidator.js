const Joi = require('@hapi/joi');


const bookSchema = Joi.object({
    title: Joi.string().required().messages({'any.required': 'Title is required'}),
    description: Joi.string().required().messages({'any.required': 'Description is required'}),
    price: Joi.number().integer().required().messages({'number.base': 'Price must be a valid integer'})
});

module.exports = {
    bookSchema
};
