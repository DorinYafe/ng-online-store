const connection = require('../connections/connections_wrapper');

// Get all cart items of user:
// server - works
// client - works
async function getAllCartItemsOfUser(cart_id) {
  const sql = `select cart_items.id, cart_items.item_id, cart_items.quantity, cart_items.total_price, cart_items.cart_id, 
  items.item_name, items.path 
  from cart_items join items 
  on cart_items.item_id = items.id where cart_items.cart_id=?`;
  let params = [cart_id];
  let allCartItems = await connection.executeWithParams(sql, params);
  // console.log (allCartItems);
  return allCartItems;
}
// getAllCartItemsOfUser (56);

// Get cart id by user id: works
async function getCartIdByUserId(user_id) {
  const sql = `select carts.id from users join carts on users.id = carts.user_id and carts.is_checked = 0 where users.id=?`;
  let params = [user_id];
  let cartId = await connection.executeWithParams(sql, params);
  // console.log(cartId[0].id);
  return cartId[0].id;
}
// getCartIdByUserId(40);

// Add cart item: works, use
async function addCartItem(cartItem) {
  const sql =
    'insert into cart_items (item_id, quantity, total_price, cart_id) values (?, ?, ?, ?)';
  let price = (await getItemPrice(cartItem.item_id)) * cartItem.quantity;
  let params = [cartItem.item_id, cartItem.quantity, price, cartItem.cart_id];
  let addedCartItem = await connection.executeWithParams(sql, params);
  cartItem.id = cartItem.insertId;
  // console.log(price);
  return addedCartItem;
}
// addCartItem({ item_id: 17, quantity: 3, cart_id: 17 });

// Get the price of an item by item's id: works, use
async function getItemPrice(item_id) {
  const sql = 'select items.item_price from items where id=?';
  let params = [item_id];
  let price = await connection.executeWithParams(sql, params);
  return price[0].item_price;
}
// getItemPrice(16);

// Update cartItem (shopping cart): works, use
async function updateCartItem(cart_item) {
  const sql =
    'update cart_items set item_id=?, quantity=?, total_price=?, cart_id=? where id=?';
  let price = (await getItemPrice(cart_item.item_id)) * cart_item.quantity;
  let params = [
    cart_item.item_id,
    cart_item.quantity,
    price,
    cart_item.cart_id,
    cart_item.id,
  ];
  let updatedCartItem = await connection.executeWithParams(sql, params);
  // await getSumOfCartItem(cart_item.cart_id);
  return updatedCartItem;
}
// updateCartItem({ item_id: 18 ,quantity: 2, cart_id: 17, id: 28 });
// updateCartItem({ item_id: 18 ,quantity: 2, cart_id: 17, id: 2 });

// Get the total price of cartItem (shopping cart) by cart's id: works, use
async function getSumOfCartItem(cart_id) {
  const sql = `select sum(total_price) as totalSum from cart_items where cart_id=?`;
  let params = [cart_id];
  let cartItemSum = await connection.executeWithParams(sql, params);
  // console.log(cartItemSum[0].totalSum);
  return cartItemSum[0].totalSum;
}
// getSumOfCartItem(16);

// Delete one item in the cartItem (shopping cart) by cartItem's id: 
async function deleteCartItem(id) {
  const sql = 'delete from cart_items where id=?';
  let params = id;
  await connection.executeWithParams(sql, params);
}
// deleteCartItem(23);

// Get column's value: works
async function getColumnValue(colName, tName, condition, id) {
  const sql = `select ${colName} from ${tName} where ${condition}=?`;
  let params = [id];
  let requestedValue = await connection.executeWithParams(sql, params);
  return requestedValue;
}
// getColumnValue("id", "cart_items", "id", 15);

// Delete all cart items: works
async function deleteAllCartItems(cart_id) {
  const sql = 'delete from cart_items where cart_id=?';
  let params = [cart_id];
  await connection.executeWithParams(sql, params);
}
// deleteAllCartItems(46);


// Delete all cart items and cart: works
async function deleteAllCartItemsAndCart(cart_id) {
  let params = [cart_id];

  const sql = 'delete from cart_items where cart_id=?';
  await connection.executeWithParams(sql, params);

  const sql1 = 'delete from carts where id=?';
  await connection.executeWithParams(sql1, params);
}
// deleteAllCartItems(9);


// Get cart item by cart id: works, use
async function getCartItemByCartId(cart_id) {
  const sql = 'select * from cart_items where cart_id=?';
  let params = [cart_id];
  let requestedCartItem = await connection.executeWithParams(sql, params);
  // console.log(requestedCartItem);
  return requestedCartItem;
};
// getCartItemByCartId(45);

module.exports = {
  addCartItem,
  getAllCartItemsOfUser,
  getCartIdByUserId,
  updateCartItem,
  getCartItemByCartId,
  deleteCartItem,
  deleteAllCartItems,
  deleteAllCartItemsAndCart,
  getColumnValue,
  getSumOfCartItem,
};
