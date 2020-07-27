const connection = require('../connections/connections_wrapper');

// getId:
async function getId(colName, tName, id) {
    const sql = `select ${colName} from ${tName} where user_id=?`;
    let params = [id];
    let requestedId = await connection.executeWithParams(sql, params);
    return requestedId;
};
// getId("user_id", "carts", 9);

// Get column's value: works
async function getColumnValue(colName, tName, condition, id) {
    let sql = `select ${colName} from ${tName} where ${condition}=?`;
    let params = [id];
    let requestedValue = await connection.executeWithParams(sql, params);
    return requestedValue;
};
// getColumnValue("delivery_date", "purchases", "delivery_date", "2020-03-30");


module.exports = {
    getId,
    getColumnValue,
}

