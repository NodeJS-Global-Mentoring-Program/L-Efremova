import { DataTypes, Model } from "sequelize";

import { sequelize } from "./../loaders/postgress-loader";
import { IUser } from "../utils/interfaces";
import { bcryptPassword } from "../utils/helpers";

export interface UserInstance extends Model<IUser, IUser>, IUser {}

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
