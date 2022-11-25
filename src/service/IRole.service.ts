import IRole from "../interface/Role.interface";

export interface IRoleService {
  checkRoleExist(dataCheck: object): Promise<any>;

  createRole(roleDto: IRole): Promise<any>;
}
