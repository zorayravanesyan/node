const Joi = require('@hapi/joi');

const userCreateSchema = Joi.object({
    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    is_admin: Joi.boolean().optional()
});
const userUpdateSchema = Joi.object({
    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
    username: Joi.string().required(),
});

const verify_code = Joi.object({
    code: Joi.number().integer().required()
});

module.exports = {
    userCreateSchema,
    userUpdateSchema,
    verify_code
};
