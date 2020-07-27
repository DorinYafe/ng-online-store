const connection = require("../connections/connections_wrapper");

// Add purchase: works, use
async function addPurchase(purchase) {
    const sql = `insert into purchases (user_id, cart_id, total_price, delivery_city, 
    delivery_street, delivery_date, credit_card) values (?, ?, ?, ?, ?, ?, ?)`;
    let purchaseTotalPrice = await getPurchaseTotalPrice(purchase.cart_id);
    let params = [purchase.user_id, purchase.cart_id, purchaseTotalPrice, purchase.delivery_city,
    purchase.delivery_street, purchase.delivery_date, purchase.credit_card];
    let addedPurchase = await connection.executeWithParams(sql, params);
    purchase.id = purchase.insertId;

    const sql1 = 'update carts set is_checked=1 where id=? and carts.user_id=?';
    let params1 = [purchase.cart_id, purchase.user_id];
    await connection.executeWithParams(sql1, params1);

    // console.log(purchase.cart_id);
    // console.log(addedPurchase);
    return addedPurchase;
};

// addPurchase({
//     user_id: 16, cart_id: 52, delivery_city: "Rehovot", delivery_street: "Hasade",
//     delivery_date: "2020-05-30", credit_card: "1234"
// });


// Get the total price of the purchase by cart id: works, use
async function getPurchaseTotalPrice(cart_id) {
    let sql = `select sum(total_price) as total_price from cart_items where cart_items.cart_id=?`
    let params = [cart_id];
    let purchaseTotalPrice = await connection.executeWithParams(sql, params);
    return purchaseTotalPrice[0].total_price;
};
// getPurchaseTotalPrice(17);


// Get all purchases: works
async function getAllPurchases() {
    let sql = "select * from purchases";
    let allPurchases = await connection.execute(sql);
    return allPurchases;
};
// getAllPurchases();


// Get purchase by id: works
async function getPurchaseById(id) {
    let sql = "select * from purchases where id=?";
    let params = [id];
    let purchase = await connection.executeWithParams(sql, params);
    return purchase;
};
// getPurchaseById(21);


// Get purchase by user id:
async function getPurchaseByUserId(user_id) {
    let sql = "select * from purchases where user_id=?";
    let params = [user_id];
    let purchaseByUserId = await connection.executeWithParams(sql, params);
    // console.log(purchaseByUserId);
    return purchaseByUserId;
};
// getPurchaseByUserId(40);


// Get purchase by delivery date: works, use
async function getPurchaseByDeliveryDate(delivery_date) {
    let sql = "select * from purchases where delivery_date=?";
    let params = [delivery_date];
    let purchaseByDeliveryDate = await connection.executeWithParams(sql, params);
    // console.log(delivery_date);
    return purchaseByDeliveryDate;
};
// getPurchaseByDeliveryDate({ delivery_date: "2020-05-27" });



module.exports = {
    addPurchase,
    getAllPurchases,
    getPurchaseById,
    getPurchaseByUserId,
    getPurchaseByDeliveryDate,
};
