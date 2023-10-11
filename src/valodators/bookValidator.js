const { validationResult } = require('express-validator');
const { bookSchema } = require('../Joi/bookValidator');

const validateCreateUpdateBook = [
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 400;
            next(error);
        } else {
            next();
        }
    },
    (req, res, next) => {
        const bookData = req.body;

        const { error } = bookSchema.validate(bookData);

        if (error) {
            const errorMessage = error.details[0].message;
            const newError = new Error(errorMessage);
            newError.statusCode = 400;
            next(newError);
        } else {
            next();
        }
    }
];

module.exports = {
    validateCreateUpdateBook
};
