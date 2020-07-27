const connection = require('../connections/connections_wrapper');

// Get cart by user id: works
// Output: cartId, userId, creationDate, isChecked
async function getCartByUserId(user_id) {
  const sql = `select carts.id as cartId, carts.user_id as userId, carts.creation_date as creationDate, carts.is_checked as isChecked 
    from carts join users on carts.user_id = users.id and carts.is_checked = 0 where carts.user_id = ?`;
  let params = [user_id];
  let cartByUserId = await connection.executeWithParams(sql, params);
  // console.log(cartByUserId[0].cartId);
  return cartByUserId;
};
// getCartByUserId(40);

// Add cart: works
async function addCart(user_id) {
  const sql = 'insert into carts (user_id) values (?)';
  let params = [user_id];
  let addedCart = await connection.executeWithParams(sql, params);
  addedCart.id = addedCart.insertId;
  // console.log(addedCart);
  return addedCart;
};
// addCart(9);

// Get all user's shopping cart by cart id:
// Output: id, item_id, quantity, total_price, cart_id, item_name, path
async function getAllCartItemsOfUser(cart_id) {
  const sql = `select cart_items.id, cart_items.item_id, cart_items.quantity, cart_items.total_price, cart_items.cart_id, 
  items.item_name, items.path 
  from cart_items join items 
  on cart_items.item_id = items.id where cart_items.cart_id=?`;
  let params = [cart_id];
  let allCartItems = await connection.executeWithParams(sql, params);
  // console.log(allCartItems);
  return allCartItems;
};
// getAllCartItemsOfUser(40);


// Delete cart: works
async function deleteCart(id) {
  let params = [id];

  const sql = 'delete from cart_items where cart_id=?';
  await connection.executeWithParams(sql, params);

  const sql1 = 'delete from carts where id=?';
  await connection.executeWithParams(sql1, params);
}
// deleteCart(21);

module.exports = {
  getCartByUserId,
  addCart,
  getAllCartItemsOfUser,
  deleteCart,
};
