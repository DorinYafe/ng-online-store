let connection = require("../connections/connections_wrapper");

// Get all categories: works, use
async function getAllCategories() {
    let sql = "select * from categories";
    let allCategories = await connection.execute(sql);
    return allCategories;
};
// getAllCategories();

// Get all items by category id:
async function getAllItemsByCategoryId(category_id) {
    const sql =`select * from items where items.category_id=?`;
    let params = [category_id];
    let itemsByCategory = await connection.executeWithParams(sql, params);
    // console.log(itemsByCategory);
    return itemsByCategory;
};
// getAllItemsByCategoryId(9)

module.exports = {
    getAllCategories,
    getAllItemsByCategoryId,
};