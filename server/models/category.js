const joi = require("joi");

class Category {

    constructor(category) {
        this.category = category;
    };

    static validate(categoryToValidate) {
        const validationSchema = {
            category: joi.string().required(),
            id: joi.number().optional(),
        };

        const error = joi.validate(categoryToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Category;