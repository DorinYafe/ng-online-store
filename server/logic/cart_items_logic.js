const cartItemsDao = require('../dao/cart_items_dao');
const validations = require('./validations');

// Get all cart items by user id:  
// isIntValid(moduleName)
async function getAllCartItemsByUserId(user_id) {
  let cart_id = await cartItemsDao.getCartIdByUserId(user_id);
  let allCartItems = await cartItemsDao.getAllCartItemsOfUser(cart_id);
  return allCartItems;
}
// getAllCartItemsByUserId(40);

// Add cart item (Add an item to shopping cart): works, use
async function addCartItem(item) {
  await validations.cartItemtValidation(item);
  let cartItemToAdd = await cartItemsDao.addCartItem(item);
  item.id = item.insertId;
  return cartItemToAdd;
}
// addCartItem({ item_id: 17, quantity: 1, cart_id: 9 });

// Update cart item (Update an item quantity in the shopping cart): works, use
async function updateCartItem(cart_item) {
  await validations.cartItemtValidation(cart_item);
  let cartItemToUpdate = await cartItemsDao.updateCartItem(cart_item);
  return cartItemToUpdate;
}
// updateCartItem({ item_id: 18 ,quantity: 2, cart_id: 17, id: 28 });

// Get the total price of the shopping cart: works, use
async function getSumOfCartItem(user_id) {
  let cartItemSum;
  let cart_id = await cartItemsDao.getCartIdByUserId(user_id)
  if (cart_id !== null) {
    cartItemSum = await cartItemsDao.getSumOfCartItem(cart_id);
  } else {
    cartItemSum = 0;
  }
  // console.log(cart_id);
  // console.log(cartItemSum);
  return cartItemSum;
};
// getSumOfCartItem(40);

// Get cart item (shopping cart) bt cart id: works, use
async function getCartItemsByCartId(cart_id) {
  let cartItem = await cartItemsDao.getAllCartItemsOfUser(cart_id);
  console.log(cartItem);
  return cartItem;
};
// getCartItemByCartId(45);


// Delete cart item: works, use
// getColumnValue(colName, tName, condition, value)
async function deleteCartItem(id) {
  await cartItemsDao.deleteCartItem(id);
};
// deleteCartItem(26);


// Delete all cart items: works, use
// getColumnValue(colName, tName, condition, id);
async function deleteAllCartItems(cart_id) {
  await validations.isIntValid(cartItemsDao.getColumnValue('cart_id', 'cart_items', 'cart_id', cart_id));
  await cartItemsDao.deleteAllCartItems(cart_id);
  console.log('Cart items deleted successfully.');
};
// deleteAllCartItems(10);

module.exports = {
  addCartItem,
  getAllCartItemsByUserId,
  updateCartItem,
  getCartItemsByCartId,
  deleteCartItem,
  deleteAllCartItems,
  getSumOfCartItem,
};
