const sql = require('mysql2');

const connection = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yy56Dy89Yy97Jy12My13',
  database: 'yafe_lee',
});

connection.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("We're connected to mySql.");
});

// One function for executing select / insert / update / delete:
function execute(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function executeWithParams(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = {
  execute,
  executeWithParams,
};
