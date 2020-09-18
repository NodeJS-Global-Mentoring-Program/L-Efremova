import express from "express";

import config from "./config";

import loaders from "./loaders";

const app = express();

loaders(app);

app.listen(config.APP_PORT, () => {
  console.log("May the 4th be with you on the port " + config.APP_PORT);
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
  process.exit(1);
});

export default app;
