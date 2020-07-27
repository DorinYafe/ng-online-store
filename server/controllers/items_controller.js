let itemsLogic = require('../logic/items_logic');
let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let config = require('../config.json');
let mapUser = require('../middleware/map');

// Add item: works
router.post('/', async (request, response) => {
  try {
    let itemToAdd = request.body;
    let addedItem = await itemsLogic.addItem(itemToAdd);
    response.status(201).json(addedItem);
  } catch (error) {
    response.status(404).json({ error: 'Cannot add item (items_controller)' });
  }
});

// Get all items: works
router.get('/', async (request, response) => {
  try {
    let allItems = await itemsLogic.getAllItems();
    response.status(200).json(allItems);
  } catch (error) {
    response
      .status(404)
      .json({ error: 'Cannot get all items. (items_controller)' });
  }
});

// Get item: works
router.get('/:id', async (request, response) => {
  try {
    let id = +request.params.id;
    let item = await itemsLogic.getItemById(id);
    response.status(200).json(item);
  } catch (error) {
    response.status(404).json({ error: 'Cannot get item. (items_controller)' });
  }
});

// Update item: works
router.put('/', async (request, response) => {
  try {
    // console.log(request.body);
    let itemToUpdate = request.body;
    itemToUpdate.category_id = +request.body.category_id;
    let updatedItem = await itemsLogic.updateItem(itemToUpdate);
    response.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    response
      .status(600)
      .json({ error: 'Cannot update item. (items_controller)' });
  }
});

// Delete item: works
router.delete('/:id', async (request, response) => {
  try {
    let id = +request.params.id;
    await itemsLogic.deleteItem(id);
    response
      .status(410)
      .send('Item deleted successfully. (items_controller)');
  } catch (error) {
    response
      .status(404)
      .json({ error: 'Cannot delete item. (items_controller)' });
  }
});

module.exports = router;
