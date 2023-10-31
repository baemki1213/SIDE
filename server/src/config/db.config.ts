import * as dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      port: Number(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DB,
    });

    console.log("DB Connect Success");
    return connection;
  } catch (err) {
    console.error(err);
    throw new Error("DB Connect Failed");
  }
}

const connection = connectDB();

export default connection;
