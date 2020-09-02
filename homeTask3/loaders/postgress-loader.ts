import { Sequelize } from "sequelize";

import fs from "fs";
import path from "path";

import config from "../config";

export const sequelize = new Sequelize({
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  dialect: "postgres",
  database: config.DB_DATABASE,
  port: config.DB_PORT,
});

export const postgresLoader = async (): Promise<void> => {
  try {
    let sql = "";

    fs.readFile(
      path.resolve(__dirname, "../data-access/initUsers.sql"),
      (err, data) => {
        if (err) {
          throw Error(err.message);
        }
        sql = data.toString();
      }
    );

    await sequelize.authenticate();
    console.log("Connection has been established successfully");
    await sequelize.query(sql);
  } catch (e) {
    console.error("Unable to connect to the database:", e);
  }
};
