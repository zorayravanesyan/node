const Joi = require('@hapi/joi');

const userLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(), 
    email: Joi.string().email().required()
});


module.exports = {
    userLoginSchema
};
