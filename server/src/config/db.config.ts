require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB,
});

connection.connect(err => {
  if (err) console.log(err);
  else console.log("DB Connect Success");
});

module.exports = connection;
