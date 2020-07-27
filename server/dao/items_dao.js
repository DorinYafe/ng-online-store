let connection = require("../connections/connections_wrapper");

// Add item: works
async function addItem(item) {
    let sql = "insert into items (item_name, item_price, path, category_id) values (?, ?, ?, ?)";
    let params = [item.item_name, item.item_price, item.path, item.category_id];
    let addedItem = await connection.executeWithParams(sql, params);
    item.id = item.insertId;
    return addedItem;
};

// addItem({ item_name: "Captian Morgan Black", item_price: 110, path: "../assets/alcohol/102048_captain-morgan_black-label-rum_700.jpg", category_id: 9 });

// Get all items: works
async function getAllItems() {
    let sql = "select * from items";
    let allItems = await connection.execute(sql);
    return allItems;
};

// getAllItems();

// Get item by id: works
async function getItemById(id) {
    let sql = "select * from items where id=?";
    let params = [id];
    let item = await connection.executeWithParams(sql, params);
    return item;
};

// getItemById(1);

// Get item id: works
async function getItemId(id) {
    let sql = "select items.id from items where id=?";
    let params = [id];
    let itemId = await connection.executeWithParams(sql, params);
    return itemId;
};

// getItemId(1);


// Update item: works
async function updateItem(item) {
    let sql = "update items set item_name=?, item_price=?, path=?, category_id=? where id=?";
    let params = [item.item_name, item.item_price, item.path, item.category_id, item.id];
    let updatedItem = await connection.executeWithParams(sql, params);
    return updatedItem;
};

// updateItem({ item_name: "Carrot", item_price: 3.50, path: "../assets/vegtables/download.jfif", category_id: 11, id: 4 });


// Delete item: works
async function deleteItem(id) {
    let params = [id];

    let sql = "delete from cart_items where item_id=?";
    await connection.executeWithParams(sql, params);

    let sql1 = "delete from items where id=?";
    await connection.executeWithParams(sql1, params);
};

// deleteItem(2);

module.exports = {
    addItem,
    getAllItems,
    getItemById,
    getItemId,
    updateItem,
    deleteItem,
};