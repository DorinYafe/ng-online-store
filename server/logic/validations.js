let CartItem = require("../models/cart_item");
let Cart = require("../models/cart");
let Category = require("../models/category");
let Item = require("../models/item");
let Purchase = require("../models/purchase");
let User = require("../models/user");

// Validate the object's length:
async function isValid(object) {
    if (object.length === 0) {
        throw new Error("No existing match in data base. (logic)");
    };
};

// User to validate:
async function userValidation(user) {
    let errorDetails = User.validate(user);
    if (errorDetails) {
        throw new Error("Invalid user details (logic)");
    };
};

// Is int valid: works
async function isIntValid(moduleName) {
    let intToValidate = await moduleName;
    if (intToValidate.length === 0) {
        throw new Error("No existing match in data base. (logic)");
    };
    return;
};

// Item to validate:
async function itemValidation(item) {
    let errorDetails = Item.validate(item);
    if (errorDetails) {
        throw new Error("Invalid item details (logic)");
    };
};

// isIntValid(usersDao.getUserId(1));


// Cart to validate:
async function cartValidation(cart) {
    let errorDetails = Cart.validate(cart);
    if (errorDetails) {
        throw new Error("Invalid cart details (logic)");
    };
};

// Category to validate:
async function categoryValidation(category) {
    let errorDetails = Category.validate(category);
    if (errorDetails) {
        throw new Error("Invalid category details (logic)");
    };
    return;
    // return category;
};

// Cart item to validate:
async function cartItemtValidation(item) {
    let errorDetails = CartItem.validate(item);
    if (errorDetails) {
        throw new Error("Invalid item details (logic)");
    };
    return;
};

// Purchase to validate:
async function purchaseValidation(purchase) {
    let errorDetails = Purchase.validate(purchase);
    if (errorDetails) {
        throw new Error("Invalid purchase details (logic)");
    };
};


module.exports = {
    isValid,
    userValidation,
    isIntValid,
    itemValidation,
    cartValidation,
    categoryValidation,
    cartItemtValidation,
    purchaseValidation,
};