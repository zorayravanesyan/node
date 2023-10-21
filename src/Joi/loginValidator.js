const Joi = require('@hapi/joi');

const userLoginSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().min(6).required(), 
});


module.exports = {
    userLoginSchema
};
