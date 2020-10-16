import express from "express";

import { users } from "../database/users";
import {
  createUser,
  getAutoSuggestUsers,
  updateUser,
  hidePassword,
} from "../models/users";
import validator from "../validation/validator";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  const { loginSubstring, limit } = req.query;
  if (limit && loginSubstring) {
    const login = loginSubstring.toString();
    const usersLimit = parseInt(limit.toString(), 10);
    const filteredUsers = getAutoSuggestUsers(login, usersLimit, users).map(
      hidePassword
    );

    res.send(filteredUsers);
  }

  res.send(users.map(hidePassword));
});

usersRouter.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (user) {
    res.send(hidePassword(user));
  } else {
    res.status(404).send("Nice try!");
  }
});

usersRouter.post("/", validator, (req, res) => {
  const newUser = createUser(req.body);

  users.push(newUser);

  res.send(hidePassword(newUser));
});

usersRouter.patch("/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (user) {
    const updatedUser = updateUser(req.body, user);
    res.send(hidePassword(updatedUser));
  } else {
    res.status(404).send("Nice try!");
  }
});

usersRouter.put("/:id", validator, (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (user) {
    const updatedUser = updateUser(req.body, user);
    res.send(hidePassword(updatedUser));
  } else {
    res.status(404).send("Nice try!");
  }
});

usersRouter.delete("/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (user) {
    const userIndex = users.findIndex((user) => user.id === req.params.id);
    const updatedUser = { ...user, isDeleted: true };
    users.splice(userIndex, 1, updatedUser);
    res.send(hidePassword(updatedUser));
  } else {
    res.status(404).send("The user does not exist");
  }
});

export { usersRouter };
