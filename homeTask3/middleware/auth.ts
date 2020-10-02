import { Request, Response, NextFunction } from "express";
import { verify, VerifyCallback } from "jsonwebtoken";

import config from "../config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const jwtToken = token ? token.split(" ")[1].trim() : null;

  if (!jwtToken) {
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }

  const handleError: VerifyCallback = (err) => {
    if (err) {
      res.status(403).send({ success: false, message: "Forbidden" });
    } else {
      next();
    }
  };

  verify(jwtToken!, config.JWT_SECRET_KEY!, handleError);
};
