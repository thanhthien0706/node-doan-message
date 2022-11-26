import { createUserDto } from "../dto/request/UserDTO";

export interface IUserService {
  save(userModel: createUserDto): Promise<any>;

  saveGitHub(userModel: createUserDto): Promise<any>;

  checkExists(condition: object): Promise<boolean>;

  checkExistUserGithub(idGithub: string): Promise<boolean>;

  findOneUserByEmail(email: string): Promise<any>;

  findOneAndUpdateByCondition(condition: object, update: object): Promise<any>;

  findOneById(id: string): Promise<any>;

  findOneByIdGithub(idGithub: string): Promise<any>;

  getAllUserWithConditionShow(hasShow: object): Promise<any>;

  deleteById(idUser: string): Promise<any>;
}
