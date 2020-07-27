const joi = require("joi");

class Cart {

    constructor(user_id) {
        this.user_id = user_id;
    };

    static validate(cartToValidate) {
        const validationSchema = {
            user_id: joi.number().required(),
            creation_date: Date().optional(),
            is_checked: joi.number().optional(),
            id: joi.number().optional(),
        };

        const error = joi.validate(cartToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Cart;