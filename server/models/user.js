const joi = require("joi");

class User {

    constructor(forename, surname, personal_id, email, password) {
        this.forename = forename;
        this.surname = surname;
        this.personal_id = personal_id;
        this.email = email;
        this.password = password;
    };

    static validate(userToValidate) {
        const validationSchema = {
            forename: joi.string().required(),
            surname: joi.string().required(),
            personal_id: joi.number().required(),
            email: joi.string().required().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),
            password: joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,10})/),
            city: joi.string().optional(),
            street: joi.string().optional(),
            user_type: joi.string().optional(),
            id: joi.number().optional(),
        };

        const error = joi.validate(userToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = User;