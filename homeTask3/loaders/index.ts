// Split the startup process into modules
import express from "express";

import { initExpressLoader } from "./express-loader";
import { postgresLoader } from "./postgress-loader";

async function loadApp(expressApp: express.Application): Promise<void> {
  try {
    initExpressLoader(expressApp);
    await postgresLoader();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default loadApp;
