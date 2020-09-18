import { ModelCtor } from "sequelize";

import { sequelize } from "../dataAccess/initSequelize";

import { IUser } from "../utils/interfaces";
import { bcryptPassword } from "../utils/helpers";
import { User } from "../dataAccess/models/user";

export default class UserService {
  usersData: typeof User;

  constructor(usersData: typeof User) {
    this.usersData = usersData;
  }

  async createUser(userDTO: IUser) {
    return await this.usersData.create({ ...userDTO, isDeleted: false });
  }

  async deleteUserById(id: string) {
    await this.removeUserFromGroups(id);
    return await this.usersData.update(
      { isDeleted: true },
      { where: { id, isDeleted: false } }
    );
  }

  async destroyUserById(id: string) {
    await this.removeUserFromGroups(id);
    return await this.usersData.destroy({ where: { id } });
  }

  async getAll(): Promise<IUser[]> {
    return await this.usersData.findAll({
      attributes: ["id", "login", "age", "isDeleted"],
      where: {
        isDeleted: false,
      },
    });
  }

  async getUserById(id: string) {
    return await this.usersData.findOne({
      attributes: ["id", "login", "age", "isDeleted"],
      where: { id, isDeleted: false },
    });
  }

  async updateUserById(id: string, userData: IUser) {
    return await this.usersData.update(
      { ...userData, password: await bcryptPassword(userData.password) },
      { where: { id } }
    );
  }

  async removeUserFromGroups(id: string | number) {
    const transaction = await sequelize.transaction();
    try {
      const user = await this.usersData.findOne({
        where: { id },
      });
      const groups = await user?.getGroups();
      await user?.removeGroups(groups);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  }
}
