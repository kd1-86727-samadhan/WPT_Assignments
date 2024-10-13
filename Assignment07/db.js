const mysql = require('mysql2');  // 

// Database Connection String
const pool = mysql.createPool({ // To connect node platform with database we use pool with mysql where database connect, how to coonect  
  host: "localhost",  //
  user: "kd1-86727-samadhan", //
  password: "manager", //
  port: 3306, // 
  database: "airbnb_db",  //
  connectionLimit: 10 //
});

// var connection = mysql.createPool(pool);
//  connection.connect();

module.exports = {
  pool
}
