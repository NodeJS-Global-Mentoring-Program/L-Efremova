import express from "express";
import { ExpressJoiError } from "express-joi-validation";

export function validationJoiErrorHandler(
  err: any | ExpressJoiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (err && err.error && err.error.isJoi) {
    const e: ExpressJoiError = err;
    const message = e?.error?.details.map((d) => d.message).join("\n");
    console.error(e?.error);
    // e.g "you submitted a bad query paramater"
    res.status(400).end(`You submitted an invalid data:\n` + message);
  } else if (err && err.message) {
    res.status(400).end(err.message);
  } else {
    console.log("err: ", err);
    res.status(500).end("internal server error");
  }
}
