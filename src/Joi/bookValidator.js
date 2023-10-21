const Joi = require('@hapi/joi');


const bookSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().required()
});

module.exports = {
    bookSchema
};
