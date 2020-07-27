const usersDao = require("../dao/users_dao");
const validations = require("./validations");
const crypto = require('crypto');
const saltRight = 'sdkjfhdskajh';
const saltLeft = '--mnlcfs;@!$ ';

// Login: works, use
async function login(user) {
    user.password = crypto
        .createHash('md5')
        .update(saltLeft + user.password + saltRight)
        .digest('hex');
    let userLoginResult = await usersDao.login(user);
    await validations.isValid(userLoginResult);
    return userLoginResult;
};
// login({ email: "dror_yovel@gmail.com", password: "As95!5"});


// Add user: works, use
async function addUser(user) {
    await validations.userValidation(user);
    user.password = crypto
        .createHash('md5')
        .update(saltLeft + user.password + saltRight)
        .digest('hex');
    let userToAdd = await usersDao.addUser(user);
    user.id = user.insertId;
    return userToAdd;
};
// addUser({ forename: "Dror", surname: "Yovel", personal_id: 741748852, email: "dror_yovel@gmail.com", password:"As95!5", city: "Tel Aviv", street: "Yad Harutzim" });


// Get user details: works
async function getUserDetails(user_id) {
    let userDetails = await usersDao.getUserDetails(user_id);
    // console.log(userDetails);
    return userDetails;
};
// getUserDetails(21);


// Get user by id: works
async function getUserById(id) {
    await validations.isIntValid(usersDao.getUserId(id));
    let requestedUser = await usersDao.getUserById(id);
    return requestedUser;
};

// getUserById(8);

// Update user: works
async function updateUser(user) {
    await validations.userValidation(user);
    let userToUpdate = await usersDao.updateUser(user);
    return userToUpdate;
};

// updateUser({ forename: "Yarin", surname: "Yafe", personal_id: 748441852, email: "yarinyafe@gmail.com", password: "As4!5", city: "Rishon LeZion", street: "Tarmav", user_type: "ADMIN", id: 5 });

// Delete user: works
async function deleteUser(id) {
    await validations.isIntValid(usersDao.getUserId(id));
    await usersDao.deleteUser(id);
    // console.log("User deleted successfully.");
};

// deleteUser(8);


module.exports = {
    login,
    addUser,
    getUserDetails,
    getUserById,
    updateUser,
    deleteUser,
};