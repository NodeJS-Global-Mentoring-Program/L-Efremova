import fs from "fs";
import path from "path";

import { sequelize } from "../data-access/init-sequelize";
import { initModelsAssociations } from "../data-access/initModels";

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

    initModelsAssociations();

    await sequelize.sync();

    await sequelize.query(sql);
  } catch (e) {
    console.error("Unable to connect to the database:", e);
  }
};
