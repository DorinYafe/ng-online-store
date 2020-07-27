const usersLogic = require("../logic/users_logic");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("../config.json");
let mapUser = require("../middleware/map");

// Login: works, use
router.post("/login", async (request, response) => {
    try {
        let user = request.body;
        let token = jwt.sign({ sub: user }, config.secret);
        let usersLoginResult = await usersLogic.login(user);
        let loginResponse = {
            token: token,
            user_type: usersLoginResult.user_type
        };
        response.status(200).json(loginResponse);
        mapUser.saveUserInfo(token, usersLoginResult);
    }
    catch (error) {
        response.status(401).json({ error: "Invalid user name or password (controller)" });
    };
});

// Add user: works, use
router.post("/register", async (request, response) => {
    try {
        let userToAdd = request.body;
        let addedUser = await usersLogic.addUser(userToAdd);
        response.status(201).json(addedUser);
    }
    catch (error) {
        response.status(404).json({ error: "Cannot add user (users_controller)" });
    };
});

// Get user by id: works
router.get("/user", async (request, response) => {
    try {
        let token = request.headers.authorization;
        let id = mapUser.checkMapForUserId(token);
        let userDetails = await usersLogic.getUserDetails(id);
        response.status(200).json(userDetails);
    }
    catch (error) {
        response.status(600).json({ error: "Cannot get user (users_controller)" });
    };
});


// Update user: works
router.put("/:id", async (request, response) => {
    try {
        let id = +request.params.id;
        let userToUpdate = request.body;
        userToUpdate.id = id;
        let updatedUser = await usersLogic.updateUser(userToUpdate);
        response.status(200).json(updatedUser);
    }
    catch (error) {
        response.status(404).json({ error: "Cannot update user (users_controller)" });
    };
});

// Delete user: works
router.delete("/:id", async (request, response) => {
    try {
        let id = +request.params.id;
        await usersLogic.deleteUser(id);
        response.status(410).send("User deleted successfully. (users_controller)");
    }
    catch (error) {
        response.status(404).json({ error: "Cannot delete user. (users_controller)" });
    };
});

module.exports = router;