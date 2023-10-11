const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    is_admin: Joi.boolean().required()
});
const userIdSchema = Joi.object({
    id: Joi.number().integer().required()
});

module.exports = {
    userSchema,
    userIdSchema
};
