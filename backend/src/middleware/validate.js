const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let formattedErrors = {};
        errors.array().forEach((err) => {
            
            formattedErrors[err.path] = err.msg;
        });
        return res.status(422).json({ errors: formattedErrors });
    }
    next();
};

module.exports = validate;