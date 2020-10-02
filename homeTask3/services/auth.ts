import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

import config from "../config";
import { User } from "../dataAccess/models/user";

export default class AuthService {
  usersData: typeof User;

  constructor(usersData: typeof User) {
    this.usersData = usersData;
  }

  private generateToken(username: string) {
    return sign({ user: username }, config.JWT_SECRET_KEY!, {
      expiresIn: "5h",
    });
  }

  async login(username: string, password: string) {
    if (username && password) {
      const user = await this.usersData.findOne({
        where: { login: username, isDeleted: false },
      });
      if (!user) return false;

      // all passwords should be encrypted in db
      const match = await bcrypt.compare(password, user.password);

      return match ? this.generateToken(username) : false;
    } else {
      return false;
    }
  }
}
