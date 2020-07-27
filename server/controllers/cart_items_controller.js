const cartItemsLogic = require('../logic/cart_items_logic');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');
let mapUser = require('../middleware/map');

// Get all cart items by user id: works, use
router.get('/', async (request, response) => {
  try {
    // let id = +req.params.id;
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    let allCartItemsOfUser = await cartItemsLogic.getAllCartItemsByUserId(id);
    response.status(200).json(allCartItemsOfUser);
  } catch (error) {
    // console.error(error);
    response.status(404).json({ error: 'cannot get!' });
  }
});

// Add cart item: works, use
router.post('/', async (request, response) => {
  try {
    let cartItemToAdd = request.body;
    let addedCartItem = await cartItemsLogic.addCartItem(cartItemToAdd);
    response.status(201).json(addedCartItem);
  } catch (error) {
    response
      .status(600)
      .json({ error: 'Cannot add cart item. (cart_items_controller)' });
  }
});

// Update cart item: works, use
router.put('/update', async (request, response) => {
  try {
    let cartItemToUpdate = request.body;
    let updatedCartItem = await cartItemsLogic.updateCartItem(cartItemToUpdate);
    response.status(200).json(updatedCartItem);
  } catch (error) {
    response.status(404).json(error);
  }
});

// Get the total sum of cart items (shopping cart) by user id: works, use
router.get('/totalsum', async (request, response) => {
  try {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    let cartItemSum = await cartItemsLogic.getSumOfCartItem(id);
    // console.log(cartItemSum);
    response.status(200).json(cartItemSum);
  } catch (error) {
    response.status(600).json(error);
  }
})

// getCartItemByCartId:
router.get('/shoppingcart/:id', async (request, response) => {
  try {
    let cartId = +request.params.id;
    let shoppingCart = await cartItemsLogic.getCartItemsByCartId(cartId);
    response.status(200).json(shoppingCart);
  }
  catch (error) {
    console.error(error);
    response.status(600).json({ error: 'Cannot get shopping cart of user (cart_items_controller)' });
  };
});


// Delete cart item: works, use
router.delete('/:id', async (request, response) => {
  try {
    let id = +request.params.id;
    await cartItemsLogic.deleteCartItem(id);
    response.status(410).json("Cart item removed from shopping cart.");
  } catch (error) {
    response.status(404).send("Cannot remove the item from the shopping cart.");
  }
})

//Delete all cart items: works, use
router.delete('/all/:id', async (request, response) => {
  try {
    let id = +request.params.id;
    await cartItemsLogic.deleteAllCartItems(id);
    response.status(200).send('All cart items deleted successfully. (cart_items_controller)');
  } catch (error) {
    response.status(404).json({ error: 'Cannot delete cart items. (cart_items_controller)' });
  }
});

module.exports = router;
