let categoriesLogic = require("../logic/categories_logic");
let express = require("express");
let router = express.Router();

// Get all categories: works
router.get("/", async (request, response) => {
    try {
        let allCategories = await categoriesLogic.getAllCategories();
        response.status(200).json(allCategories);
    }
    catch (error) {
        response.status(404).json({ error: "Cannot get all categories. (categories_controller)" });
    };
});

module.exports = router;