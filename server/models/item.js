const joi = require("joi");

class Item {

    constructor(item_name, item_price, path, category_id) {
        this.item_name = item_name;
        this.item_price = item_price;
        this.path = path;
        this.category_id = category_id;
    };

    static validate(itemToValidate) {
        const validationSchema = {
            item_name: joi.string().required(),
            item_price: joi.number().required(),
            path: joi.string().optional(),
            category_id: joi.number().required(),
            id: joi.number().optional(),
        };

        const error = joi.validate(itemToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Item;