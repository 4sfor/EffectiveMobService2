import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const connectionDb = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOSTNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: console.log,
});

export default connectionDb;
