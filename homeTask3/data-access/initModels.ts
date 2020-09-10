import { User } from "../models/user";
import { Group } from "../models/group";

export function initModelsAssociations() {
  Group.belongsToMany(User, { through: "UserGroup" });
  User.belongsToMany(Group, { through: "UserGroup" });
}
