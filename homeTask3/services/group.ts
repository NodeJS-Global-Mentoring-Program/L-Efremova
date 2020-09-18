import { ModelCtor } from "sequelize";

import { sequelize } from "../dataAccess/initSequelize";

import { IGroup } from "../utils/interfaces";
import { Group, GroupInstance } from "../dataAccess/models/group";

export default class GroupService {
  groupData: typeof Group;

  constructor(groupData: ModelCtor<GroupInstance>) {
    this.groupData = groupData;
  }

  async createGroup(groupDTO: IGroup) {
    return await this.groupData.create(groupDTO);
  }

  async deleteGroupById(id: string) {
    return await this.groupData.destroy({ where: { id } });
  }

  async getAll(): Promise<IGroup[]> {
    return await this.groupData.findAll();
  }

  async getGroupById(id: string) {
    return await this.groupData.findByPk(id);
  }

  async updateGroupById(id: string, groupData: IGroup) {
    return await this.groupData.update(groupData, {
      where: { id },
    });
  }

  async addUsersToGroup(id: string | number, userIds: Array<string | number>) {
    return sequelize.transaction(async () => {
      const group = await this.groupData.findOne({ where: { id: id } });
      return await group?.addUsers(userIds);
    });
  }
}
