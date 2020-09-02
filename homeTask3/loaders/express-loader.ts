import express from "express";

import { usersRouter } from "../routes/users";
import { validationJoiErrorHandler } from "../utils/error-handler";

export function initExpressLoader(app: express.Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/users", usersRouter);

  app.use(validationJoiErrorHandler);
}