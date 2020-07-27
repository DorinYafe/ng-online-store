const express = require('express');
const server = express();

const cartItemsController = require('./controllers/cart_items_controller');
const cartsController = require('./controllers/carts_controller');
const categoriesController = require('./controllers/categories_controller');
const errorHandler = require('./middleware/error_handler');
const itemsController = require('./controllers/items_controller');
const purchasesController = require('./controllers/purchases_controller');
const usersController = require('./controllers/users_controller');

server.use(express.json());

// The relative route for handling cart items:
server.use('/cartitems', cartItemsController);

// The relative route for handling carts:
server.use('/carts', cartsController);

// The relative route for handling categories:
server.use('/categories', categoriesController);

// The relative route for handling items:
server.use('/items', itemsController);

// The relative route for handling purchases:
server.use('/purchases', purchasesController);

// The relative route for handling users:
server.use('/users', usersController);

const uploads = require('./controllers/uploads');
server.use(express.static('uploads'));
server.use(uploads);

let loginFilter = require('./middleware/login_filter');

server.use(loginFilter());
server.use(errorHandler);


server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
