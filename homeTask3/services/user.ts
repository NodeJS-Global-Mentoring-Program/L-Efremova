import { ModelCtor } from "sequelize";

import { IUser } from "../utils/interfaces";
import { bcryptPassword } from "../utils/helpers";
import { User, UserInstance } from "../models/user";

export default class UserService {
  usersData: typeof User;

  constructor(usersData: ModelCtor<UserInstance>) {
    this.usersData = usersData;
  }

  async createUser(userDTO: IUser) {
    return await this.usersData.create({ ...userDTO, isDeleted: false });
  }

  async deleteUserById(id: string) {
    return await this.usersData.update(
      { isDeleted: true },
      { where: { id, isDeleted: false } }
    );
  }

  async destroyUserById(id: string) {
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
    return await this.usersData.findByPk(id, {
      attributes: ["id", "login", "age", "isDeleted"],
    });
  }

  async updateUserById(id: string, userData: IUser) {
    return await this.usersData.update(
      { ...userData, password: await bcryptPassword(userData.password) },
      { where: { id } }
    );
  }
}
