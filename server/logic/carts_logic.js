const cartsDao = require('../dao/carts_dao');
const validations = require('./validations');

// Get cart by user id:
// Output: number
async function getUserShoppingCart(user_id) {
  let cartByUserId = await cartsDao.getCartByUserId(user_id);
  if (cartByUserId.length === 0) {
    await cartsDao.addCart(user_id);
  };
  let cartId = cartByUserId[0].cartId;
  let shoppingCart = await cartsDao.getAllCartItemsOfUser(cartId);
  // console.log(shoppingCart);
  return shoppingCart;
};
// getUserShoppingCart(40);

// Add cart: works
async function addCart(cart) {
  // await validations.cartValidation(cart);
  let cartToAdd = await cartsDao.addCart(cart);
  cart.id = cart.insertId;
  // console.log(cartToAdd);
  return cartToAdd;
};
// addCart({ user_id: 29 });

// Get cart by user id:
async function getCartByUserId(user_id) {
  let cartByUserId = await cartsDao.getCartByUserId(user_id);
  // console.log(cartByUserId);
  return cartByUserId;
};
// getCartByUserId(40);


// Delete cart: works
async function deleteCart(id) {
  await validations.isIntValid(cartsDao.getId('id', 'carts', id));
  await cartsDao.deleteCart(id);
  console.log('Cart deleted successfully.');
}
// deleteCart(20);

module.exports = {
  getUserShoppingCart,
  addCart,
  getCartByUserId,
  deleteCart,
};
