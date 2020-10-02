import fs from "fs";
import path from "path";

import { sequelize } from "../dataAccess/initSequelize";
import {
  initModelsAssociations,
  initFakeUsersData,
} from "../dataAccess/initModels";

export const postgresLoader = async (): Promise<void> => {
  try {
    let sql = "";

    fs.readFile(
      path.resolve(__dirname, "../dataAccess/initUsers.sql"),
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
    const insertUsers = await initFakeUsersData();
    await sequelize.query(insertUsers);
  } catch (e) {
    console.error("Unable to connect to the database:", e);
  }
};
