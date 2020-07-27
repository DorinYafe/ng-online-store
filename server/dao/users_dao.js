const connection = require("../connections/connections_wrapper");

// login: works, use 
async function login(user) {
    const sql = "select * from users where email=? and password=?";
    let params = [user.email, user.password];
    let userLoginResult = await connection.executeWithParams(sql, params);
    return userLoginResult[0];
};
// login({ email: "dorinyafe@gmail.com", password: "124" });

// Add new user: works, use
async function addUser(user) {
    const sql = "insert into users(forename, surname, personal_id, email, password, city, street) values (?, ?, ?, ?, ?, ?, ?)";
    let params = [user.forename, user.surname, user.personal_id, user.email, user.password, user.city, user.street];
    let addedUser = await connection.executeWithParams(sql, params);
    user.id = user.insertId;
    return addedUser;
};
// addUser({ forename: "Maya", surname: "Namirovski", personal_id: "209741358", email: "mayaNamirovski@gmail.com", password:"85Ad@24", city: "Rehovot", street: "Hasade" });

// Get user details: works
async function getUserDetails(user_id) {
    const sql = `select users.forename, users.surname, users.city, users.street, 
    carts.id as cart_id, carts.creation_date, carts.is_checked
    from users join carts
    on users.id = carts.user_id 
    where carts.is_checked=0 and users.id =?`;
    let params = [user_id];
    let userDetails = await connection.executeWithParams(sql, params);
    // console.log(userDetails[0]);
    return userDetails[0];
};
// getUserDetails(21);

// Get user by id: works
async function getUserById(id) {
    let sql = "select * from users where id=?";
    let params = [id];
    let user = await connection.executeWithParams(sql, params);
    return user;
};
// getUserById(4);

// Get user id: works
async function getUserId(id) {
    let sql = "select users.id from users where id=?";
    let params = [id];
    let userId = await connection.executeWithParams(sql, params);
    return userId;
};

// getUserId(1);


// Update user: works
async function updateUser(user) {
    let sql = "update users set forename=?, surname=?, personal_id=?, email=?, password=?, city=?, street=?, user_type=? where id=?";
    let params = [user.forename, user.surname, user.personal_id, user.email, user.password, user.city, user.street, user.user_type, user.id];
    let updatedUser = await connection.executeWithParams(sql, params);
    return updatedUser;
};

// updateUser({ forename: "Yarin", surname: "Yafe", personal_id: "987654321", email: "yarinyafe@gmail.com", password:"56#Fל78", city: "Rishon LeZion", street: "Tarmav", user_type: "ADMIN", id: 5 });


// Delete user: works
async function deleteUser(id) {
    let params = [id];

    let cartsSql = "delete from carts where user_id=?";
    await connection.executeWithParams(cartsSql, params);

    let purchasesSql = "delete from purchases where user_id=?";
    await connection.executeWithParams(purchasesSql, params);

    let usersSql = "delete from users where id=?";
    let deleteResponse = await connection.executeWithParams(usersSql, params);

    return deleteResponse;
};

// deleteUser(4);

module.exports = {
    login,
    addUser,
    getUserDetails,
    getUserById,
    getUserId,
    updateUser,
    deleteUser,
};