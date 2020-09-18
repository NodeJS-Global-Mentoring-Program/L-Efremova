import {
  DataTypes,
  Model,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
} from "sequelize";

import { sequelize } from "../initSequelize";

import { IGroup } from "../../utils/interfaces";

import { User, UserInstance } from "./user";

class GroupModel extends Model<IGroup, IGroup> {
  static associate = () => {
    GroupModel.associations.users = GroupModel.belongsToMany(User, {
      through: "UserGroup",
    });
  };
}

export interface GroupInstance extends GroupModel, IGroup {
  addUsers: BelongsToManyAddAssociationsMixin<UserInstance, UserInstance["id"]>;
  getUsers: BelongsToManyGetAssociationsMixin<UserInstance>;
  removeUsers: BelongsToManyRemoveAssociationsMixin<
    UserInstance,
    UserInstance["id"]
  >;
}

export const Group = sequelize.define<GroupInstance>(
  "Group",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    modelName: "Group",
    tableName: "groups",
    timestamps: false,
  }
);
