const joi = require("joi");

class Purchase {

    constructor(user_id, cart_id, total_price, delivery_city, delivery_street, delivery_date, credit_card) {
        this.user_id = user_id;
        this.cart_id = cart_id;
        this.total_price = total_price;
        this.delivery_city = delivery_city;
        this.delivery_street = delivery_street;
        this.delivery_date = delivery_date;
        this.credit_card = credit_card;
    };

    static validate(purchaseToValidate) {
        const validationSchema = {
            user_id: joi.number().required(),
            cart_id: joi.number().required(),
            total_price: joi.number().optional(),
            delivery_city: joi.string().required(),
            delivery_street: joi.string().required(),
            delivery_date: joi.date().required(),
            credit_card: joi.number().required(),
            id: joi.number().optional(),
        };

        const error = joi.validate(purchaseToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Purchase;