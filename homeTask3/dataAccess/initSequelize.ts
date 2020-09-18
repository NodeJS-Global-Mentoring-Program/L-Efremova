import { Sequelize } from "sequelize";

import config from "../config";

export const sequelize = new Sequelize({
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  dialect: "postgres",
  database: config.DB_DATABASE,
  port: config.DB_PORT,
});
