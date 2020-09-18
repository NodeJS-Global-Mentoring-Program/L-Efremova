import {
  DataTypes,
  Model,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
} from "sequelize";

import { sequelize } from "../initSequelize";

import { IUser } from "../../utils/interfaces";
import { bcryptPassword } from "../../utils/helpers";

import { Group, GroupInstance } from "./group";

class UserModel extends Model<IUser, IUser> {
  static associate = () => {
    UserModel.associations.groups = UserModel.belongsToMany(Group, {
      through: "UserGroup",
    });
  };
}

export interface UserInstance extends UserModel, IUser {
  getGroups: BelongsToManyGetAssociationsMixin<GroupInstance>;
  removeGroups: BelongsToManyRemoveAssociationsMixin<
    GroupInstance,
    GroupInstance["id"]
  >;
}

export const User = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

User.beforeCreate(async (user: UserInstance) => {
  const hashedPassword = await bcryptPassword(user.password);
  user.password = hashedPassword;
});
