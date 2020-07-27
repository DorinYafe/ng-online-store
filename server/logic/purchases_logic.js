const purchasesDao = require("../dao/purchases_dao");
const sharedDao = require('../dao/shared_dao');
const validations = require("./validations");

// Add purchase: works
async function addPurchase(purchase) {
    await validations.purchaseValidation(purchase);
    let purchaseToAdd = await purchasesDao.addPurchase(purchase);
    purchase.id = purchase.insertId;
    return purchaseToAdd;
};
// addPurchase({
//     user_id: 11, cart_id: 17, delivery_city: "Holon", delivery_street: "Harakevet",
//     delivery_date: "2020-03-30", credit_card: "1234"
// });


// Get purchase by user id: works, use
// getColumnValue(colName, tName, condition, id)
async function getPurchaseByUserId(user_id) {
    await sharedDao.getColumnValue("user_id", "purchases", "user_id", user_id);
    let purchaseByUserId = await purchasesDao.getPurchaseByUserId(user_id)
    // console.log(purchaseByUserId);
    return purchaseByUserId;
};
// getPurchaseByUserId(40);





// Get all purchases: works
async function getAllPurchases() {
    let allPurchases = await purchasesDao.getAllPurchases();
    await validations.isValid(allPurchases);
    return allPurchases;
};

// getAllPurchases();


// Get purchase by id: works
// isIntValid(moduleName)
// getColumnValue(colName, tName, condition, id)
async function getPurchaseById(id) {
    await validations.isIntValid(purchasesDao.getColumnValue("id", "purchases", "id", id));
    let requestedPurchase = await purchasesDao.getPurchaseById(id);
    return requestedPurchase;
};

// getPurchaseById(21);



// Get purchase by delivery date: works
async function getPurchaseByDeliveryDate(delivery_date) {
    let purchaseByDeliveryDate = await purchasesDao.getPurchaseByDeliveryDate(delivery_date);
    // console.log(delivery_date);
    // console.log(purchaseByDeliveryDate.delivery_date);
    return purchaseByDeliveryDate;
};
// getPurchaseByDeliveryDate({ delivery_date: "2020-05-27" });


module.exports = {
    addPurchase,
    getPurchaseByUserId,
    getAllPurchases,
    getPurchaseById,
    getPurchaseByDeliveryDate,
};