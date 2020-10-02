import express from "express";

import GroupService from "../services/group";
import { Group } from "../dataAccess/models/group";
import { authMiddleware } from "../middleware/auth";

const groupsRouter = express.Router();
const groupService = new GroupService(Group);

groupsRouter.use(authMiddleware);

groupsRouter.get("/", async (req, res, next) => {
  const groups = await groupService.getAll().catch(next);

  res.send(groups);
});

groupsRouter.get("/:id", async (req, res, next) => {
  const group = await groupService.getGroupById(req.params.id).catch(next);

  if (group) {
    res.send(group);
  } else {
    res.status(404).send("Nice try!");
  }
});

groupsRouter.post("/", async (req, res, next) => {
  //TODO: add validation
  console.log(req.body);
  const newGroup = await groupService
    .createGroup({
      ...req.body,
      permissions: req.body.permissions.split(","),
    })
    .catch(next);

  res.send(newGroup);
});

groupsRouter.put("/:id", async (req, res, next) => {
  const group = await groupService
    .updateGroupById(req.params.id, req.body)
    .catch(next);
  if (group) {
    res.send(`Group with id ${req.params.id} was updated successfully`);
  } else {
    res.status(404).send("Nice try!");
  }
});

groupsRouter.delete("/:id", async (req, res, next) => {
  const group = await groupService.deleteGroupById(req.params.id).catch(next);

  if (group) {
    res.send(`Group with id ${req.params.id} was deleted`);
  } else {
    res.status(404).send("The group does not exist");
  }
});

groupsRouter.post("/:groupId/users", async (req, res, next) => {
  await groupService
    .addUsersToGroup(req.params.groupId, [req.body.userId])
    .then((data) => {
      res.send(`User with id ${req.body.userId} is joined this group!`);
    })
    .catch(next);
});

export { groupsRouter };
