let itemsDao = require("../dao/items_dao.js");
let validations = require("../logic/validations");

// Add Item: works
async function addItem(item) {
    await validations.itemValidation(item);
    let itemToAdd = await itemsDao.addItem(item);
    item.id = item.insertId;
    return itemToAdd;
};

// addItem({ item_name: "Panda Peanut Butter", item_price: 20, path: "../assets/sweets/pandaPeanutButter.png", category_id: 7 });

// Get all items: works
async function getAllItems() {
    let allItems = await itemsDao.getAllItems();
    await validations.isValid(allItems);
    return allItems;
};

// getAllItems();

// Get item by id: works
async function getItemById(id) {
    await validations.isIntValid(itemsDao.getItemId(id));
    let requestedItem = await itemsDao.getItemById(id);
    return requestedItem;
};

// getItemById(14);

// Update item: works
async function updateItem(item) {
    await validations.itemValidation(item);
    let itemToUpdate = await itemsDao.updateItem(item);
    return itemToUpdate;
};

// updateItem({ item_name: "Carrot", item_price: 3.90, path: "../assets/vegtables/download.jfif", category_id: 11, id: 4 });

// Delete item: works
async function deleteItem(id) {
    await validations.isIntValid(itemsDao.getItemId(id));
    await itemsDao.deleteItem(id);
    console.log("Item deleted successfully.");
};

// deleteItem(3);


module.exports = {
    addItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
};