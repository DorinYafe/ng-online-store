let categoriesDao = require("../dao/categories_dao");
let validations = require("./validations");

// Get all categories: works
async function getAllCategories() {
    let allCategories = await categoriesDao.getAllCategories();
    await validations.isValid(allCategories);
    return allCategories;
};

// getAllCategories();


module.exports = {
    getAllCategories,
};