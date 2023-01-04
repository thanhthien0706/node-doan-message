import { createUserDto } from "../dto/request/UserDTO";

export interface IUserService {
  getAllUserWithConditionShow(hasShow: object): Promise<any>;

  save(userModel: createUserDto): Promise<any>;

  searchUser(searchText: string): Promise<any>;

  saveGitHub(userModel: createUserDto): Promise<any>;

  checkExists(condition: object): Promise<boolean>;

  checkExistUserGithub(idGithub: string): Promise<boolean>;

  findOneUserByEmail(email: string): Promise<any>;

  findOneAndUpdateByCondition(condition: object, update: object): Promise<any>;

  findOneById(id: string): Promise<any>;

  findOneByIdGithub(idGithub: string): Promise<any>;

  deleteById(idUser: string): Promise<any>;

  updateStatusUser(id: string, activity: boolean): Promise<any>;
}
