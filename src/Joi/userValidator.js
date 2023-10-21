const Joi = require('@hapi/joi');

const userCreateSchema = Joi.object({
    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).max(12).required(), 
    email: Joi.string().email().required(),
    is_admin: Joi.boolean().optional()
});
const userUpdateSchema = Joi.object({
    last_name: Joi.string().optional(),
    first_name: Joi.string().optional(),
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
});

const verify_code = Joi.object({
    code: Joi.number().integer().required()
});

module.exports = {
    userCreateSchema,
    userUpdateSchema,
    verify_code
};
