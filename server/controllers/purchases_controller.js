let purchasesLogic = require("../logic/purchases_logic");
let express = require("express");
let router = express.Router();
let jwt = require('jsonwebtoken');
let config = require("../config.json");
let mapUser = require("../middleware/map");

// Add purchase: works, use
router.post("/", async (request, response) => {
    try {
        let token = request.headers.authorization;
        let id = mapUser.checkMapForUserId(token);
        let purchaseToAdd = request.body;
        purchaseToAdd.user_id = id;
        // console.log(purchaseToAdd);
        let addedPurchase = await purchasesLogic.addPurchase(purchaseToAdd);
        response.status(201).json(addedPurchase);
    }
    catch (error) {
        response.status(600).json({ error: "Cannot add purchase (purchasess_controller)" });
    };
});


// Get purchase by user id: works, use
router.get("/users", async (request, response) => {
    try {
        let token = request.headers.authorization;
        let id = mapUser.checkMapForUserId(token);
        console.log(id);
        let purchaseByUserId = await purchasesLogic.getPurchaseByUserId(id);
        response.status(200).json(purchaseByUserId);
    }
    catch (error) {
        console.error(error);
        response.status(600).json({ error: "Cannot get purchase by user id. (purchases_controller)" });
    };
});


// Get purchase by delivery date: works, use
router.get("/deliverydate/:date", async (request, response) => {
    try {
        // console.log(request.params);
        let deliveryDate = request.params.date;
        let purchaseByDeliveryDate = await purchasesLogic.getPurchaseByDeliveryDate(deliveryDate);
        response.status(200).json(purchaseByDeliveryDate);
    }
    catch (error) {
        console.error(error);
        response.status(600).json({ error: "Cannot get purchase by delivery date. (purchases_controller)" });
    };
});


module.exports = router;



// Get all purchases: works
router.get("/", async (request, response) => {
    try {
        let allPurchases = await purchasesLogic.getAllPurchases();
        response.status(200).json(allPurchases);
    }
    catch (error) {
        response.status(404).json({ error: "Cannot get all purchases. (purchases_controller)" });
    };
});

// Get purchase by id: works
router.get("/:id", async (request, response) => {
    try {
        let id = +request.params.id;
        let purchase = await purchasesLogic.getPurchaseById(id);
        response.status(200).json(purchase);
    }
    catch (error) {
        response.status(404).json({ error: "Cannot get purchase (purchases_controller)" });
    };
});




// Update purchase:
router.put("/:id", async (request, response) => {
    try {
        let id = +request.body.id;
        let purchaseToUpdate = request.body;
        purchaseToUpdate.id = id;
        let updatedPurchase = await purchasesLogic.updatePurchase(purchaseToUpdate);
        response.status(200).json(updatedPurchase);
    }
    catch (error) {
        response.status(404).json({ error: "Cannot update purchase. (purchases_controller)" });
    };
});

// Delete purchase:
router.delete("/:id", async (request, response) => {
    try {
        let id = +request.body.id;
        await purchasesLogic.deletePurchase(id);
        response.status(410).send("Purchase deleted successfully. (purchases_controller)");
    }
    catch (error) {
        response.status(404).json({ error: "Cannot delete purchase. (purchases_controller)" });
    };
});
