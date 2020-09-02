import express from "express";

import UserService from "../services/user";
import { User } from "../models/user";

import validator from "./validator";

const usersRouter = express.Router();
const userService = new UserService(User);

usersRouter.get("/", async (req, res, next) => {
  const users = await userService.getAll().catch(next);

  res.send(users);
});

usersRouter.get("/:id", async (req, res, next) => {
  const user = await userService.getUserById(req.params.id).catch(next);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("Nice try!");
  }
});

usersRouter.post("/", validator, async (req, res, next) => {
  const newUser = await userService.createUser(req.body).catch(next);

  res.send(newUser);
});

usersRouter.patch("/:id", async (req, res, next) => {
  const user = await userService
    .updateUserById(req.params.id, req.body)
    .catch(next);
  if (user) {
    res.send(`User with id ${req.params.id} was updated successfully`);
  } else {
    res.status(404).send("Nice try!");
  }
});

usersRouter.put("/:id", validator, async (req, res, next) => {
  const user = await userService
    .updateUserById(req.params.id, req.body)
    .catch(next);
  if (user) {
    res.send(`User with id ${req.params.id} was updated successfully`);
  } else {
    res.status(404).send("Nice try!");
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  const user = await userService.deleteUserById(req.params.id).catch(next);
  if (user) {
    res.send(`User with id ${req.params.id} was deleted`);
  } else {
    res.status(404).send("The user does not exist");
  }
});

export { usersRouter };
