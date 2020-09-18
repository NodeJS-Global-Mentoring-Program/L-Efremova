import express from "express";
import { ExpressJoiError } from "express-joi-validation";

import { logger } from "./logger";

export function errorHandler(
  err: any | ExpressJoiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (err?.error?.isJoi) {
    const e: ExpressJoiError = err;
    const message = e?.error?.details.map((d) => d.message).join("\n");
    logger.error(`Error: ${req.method} ${req.url} ${message}`);
    res.status(400).end(`You submitted an invalid data:\n` + message);
  } else if (err?.status == 400 && err?.message) {
    logger.error(`Error: ${req.method} ${req.url} ${err.message}`);
    res.status(400).end(err.message);
  } else {
    logger.error(`Error: ${req.method} ${req.url} ${err}`);
    res.status(500).end("Internal server error");
  }
}
