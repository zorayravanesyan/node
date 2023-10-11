const { validationResult, body, param } = require('express-validator');
const { userSchema } = require('../Joi/userValidator');

const validateUser = [
    (req, res, next) => {
        const unexpectedFields = Object.keys(req.body).filter(field => !['first_name', 'last_name', 'username', 'password'].includes(field));
        
        if (unexpectedFields.length > 0) {
            return res.status(400).json({ errors: [{ msg: 'Unexpected fields in request', param: unexpectedFields.join(',') }] });
        }

        next();
    },
    body('first_name').isString().notEmpty(),
    body('last_name').isString().notEmpty(),
    body('username').isString().notEmpty(),
    body('password').isString().isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        const userData = req.body;
        const { error: joiError } = userSchema.validate(userData);

        if (!errors.isEmpty() || joiError) {
            const combinedErrors = errors.array().concat(joiError ? joiError.details : []);
            return res.status(400).json({ errors: combinedErrors });
        }

        next();
    }
];

const validateUserId = [
    param('id').isNumeric().toInt(),
];

module.exports = {
    validateUser,
    validateUserId
};
