const options = {
    allowUnknown: true,
    abortEarly: false
};

const validate = (obj, property, schema, includeOptions, next) => {
    try {
        let error = schema.validate(obj[property], includeOptions && options).error;

        if (error) {
            const message = error.details.map(i => i.message).join(', ');
            // const message = error.message;
            throw new Error(message);
        } else {
            next();
        }
    } catch (error) {
        next(error)
    }
};//////

const reqMiddleware = (schema, property = 'body', includeOptions = false) => {/////false
    return (req, res, next) => {
        validate(
            req,
            property,
            schema,
            includeOptions,
            next
        )
    }
};
const chatMiddleware = (schema, data, cb) => {
    return new Promise((resolve, reject) => {
        const {
            error
        } = schema.validate(data, false);

        if (error) {
            const message = error.details.map(i => i.context.label).join(',');
            reject(new Error(message));
        } else {
            resolve(data);
        }

    });


};

const resMiddleware = (schema, includeOptions = true) => {
    return (req, res, next) => {
        validate(
            res,
            'identity',
            schema,
            includeOptions,
            next
        )
    }
};
module.exports = {
    req: reqMiddleware,
    res: resMiddleware,
    chat: chatMiddleware,
};