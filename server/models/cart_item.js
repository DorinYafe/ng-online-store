const joi = require("joi");

class CartItem {

    constructor(item_id, quantity, total_price, cart_id) {
        this.item_id = item_id;
        this.quantity = quantity;
        this.total_price = total_price;
        this.cart_id = cart_id;
    };

    static validate(cartItemToValidate) {
        const validationSchema = {
            item_id: joi.number().required(),
            quantity: joi.number().required(),
            total_price: joi.number().optional(),
            cart_id: joi.number().required(),
            id: joi.number().optional(),
        };

        const error = joi.validate(cartItemToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = CartItem;