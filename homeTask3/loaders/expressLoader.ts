import express from "express";

import { authRouter } from "../routes/auth";
import { usersRouter } from "../routes/users";
import { groupsRouter } from "../routes/groups";
import { errorHandler } from "../utils/errorHandler";
import { logger } from "../utils/logger";

export function initExpressLoader(app: express.Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(authRouter);
  app.use((req, res, next) => {
    if (process.env.NODE_ENV === "development") {
      logger.info(`Request: ${req.method} ${req.url}`);
    }
    next();
  });

  app.use("/users", usersRouter);
  app.use("/groups", groupsRouter);

  app.use(errorHandler);
}
