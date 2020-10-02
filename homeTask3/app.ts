import express from "express";
import cors from "cors";

import config from "./config";

import loaders from "./loaders";

const app = express();

loaders(app);

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost",
    })
  );
}

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
