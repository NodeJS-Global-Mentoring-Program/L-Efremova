import express from "express";

import config from "./config";

import loaders from "./loaders";
// import { errorHandler } from "./utils/error-handler";

const app = express();

loaders(app);

app.listen(config.APP_PORT, () => {
  console.log("May the 4th be with you on the port " + config.APP_PORT);
});

export default app;
