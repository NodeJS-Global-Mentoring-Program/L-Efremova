import express from "express";

import AuthService from "../services/auth";
import { User } from "../dataAccess/models/user";

const authRouter = express.Router();
const authService = new AuthService(User);

authRouter.post("/login", async (req, res, next) => {
  const token = await authService.login(req.body.username, req.body.password);
  console.log("token: ", token);

  if (token) {
    res.status(200).send({ token });
  } else {
    res.status(401).send("Unauthorize");
  }
});

export { authRouter };
