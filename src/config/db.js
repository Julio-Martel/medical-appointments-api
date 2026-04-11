const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Climax4561@",
    database: "medical_management"
});

module.exports = pool.promise();