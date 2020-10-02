import { User } from "./models/user";
import { Group } from "./models/group";

import { bcryptPassword } from "../utils/helpers";

export async function initFakeUsersData() {
  const users = [
    { login: "Anakin", password: "password1", age: 40 },
    { login: "Padme", password: "password2", age: 35 },
    { login: "Leila", password: "password3", age: 20 },
    { login: "Luke", password: "password4", age: 20 },
    { login: "Ben", password: "password5", age: 5 },
    { login: "Han", password: "password6", age: 20 },
  ];

  let mySqlCommand = `INSERT INTO users (login, password, age, "isDeleted") VALUES`;
  const data = await Promise.all(
    users.map(async ({ login, password, age }, i) => {
      return `('${login}', '${await bcryptPassword(
        password
      )}', ${age}, false) `;
    })
  );

  return mySqlCommand + data.join(",") + " ON CONFLICT (login) DO NOTHING;";
}

export function initModelsAssociations() {
  Group.belongsToMany(User, { through: "UserGroup" });
  User.belongsToMany(Group, { through: "UserGroup" });
}
