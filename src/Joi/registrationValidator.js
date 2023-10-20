const Joi = require('@hapi/joi');

const userRegistrationSchema = Joi.object({
    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(), 
    email: Joi.string().email().required(),
    is_admin: Joi.boolean().optional()
});


module.exports = {
    userRegistrationSchema
};
