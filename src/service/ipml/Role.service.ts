import RoleRepository from "../../repository/Role.repository";
import createError from "http-errors";
import { createRoleDto } from "../../dto/request/RoleDTO";

class RoleService {
  async checkRoleExist(dataCheck: object): Promise<any> {
    const check = await RoleRepository.checkExists(dataCheck);
    if (!check) {
      return false;
    }
    return true;
  }

  async createRole(roleDto: createRoleDto): Promise<any> {
    const check = await this.checkRoleExist({ name: roleDto.name });

    if (check) {
      throw createError(404, "Role Already Exists");
    }

    const newRole = await RoleRepository.create(roleDto);
    if (!newRole) {
      throw createError(501, "Not Create Role");
    }

    return newRole;
  }

  async findOneByName(nameRole: string): Promise<any> {
    const dataRole = await RoleRepository.findOneByName(nameRole);
    if (!dataRole) {
      throw createError(404, "Role Already Exists");
    }
    return dataRole;
  }

  async findOneByField(condition: object): Promise<any> {
    const dataRole = await RoleRepository.findOneByField(condition);

    if (!dataRole) {
      throw createError(404, "Role Already Exists");
    }
    return dataRole;
  }
}

export default new RoleService();
