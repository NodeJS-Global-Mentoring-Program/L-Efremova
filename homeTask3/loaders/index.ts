// Split the startup process into modules
import express from "express";

import { initExpressLoader } from "./expressLoader";
import { postgresLoader } from "./postgressLoader";

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
