const cartsLogic = require('../logic/carts_logic');
const express = require('express');
const router = express.Router();
let mapUser = require('../middleware/map');

// Get user's shopping cart:
router.get('/shoppingcart', async (request, response) => {
  try {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    let requestedCart = await cartsLogic.getUserShoppingCart(id);
    response.status(200).json(requestedCart);
  } catch (error) {
    response.status(600).json(error);
  }
});

// Add cart: works
router.post('/addcart', async (request, response) => {
  try {
    let token = request.headers.authorization;
    let cartToAdd = mapUser.checkMapForUserId(token);
    let addedCart = await cartsLogic.addCart(cartToAdd);
    response.status(201).json(addedCart);
  } catch (error) {
    response.status(404).json({ error: 'Cannot add cart (carts_controller)' });
  }
});

// Get cart by user id:
router.get('/', async (request, response) => {
  try {
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    let requestedCart = await cartsLogic.getCartByUserId(id);
    response.status(200).json(requestedCart);
  } catch (error) {
    response.status(600).json(error);
  }
});


// Delete cart: works
router.delete('/:id', async (request, response) => {
  try {
    let id = +request.params.id;
    await cartsLogic.deleteCart(id);
    response.status(410).send('Cart deleted successfully. (carts_controller)');
  } catch (error) {
    response.status(404).json({ error: 'Cannot delete cart. (carts_controller)' });
  }
});

module.exports = router;

