import createError from "http-errors";

import { createUserDto } from "../../dto/request/UserDTO";
import UserRepository from "../../repository/User.repository";
import { IUserService } from "../IUser.service";

class UserService implements IUserService {
  async searchUser(searchText: string): Promise<any> {
    const users: any = await UserRepository.searchUser(searchText);

    if (!users || users.length <= 0) {
      throw new createError.NotFound("Users Not Found");
    }

    return users;
  }

  async findOneByIdGithub(idGithub: string): Promise<any> {
    const user = await UserRepository.findOneByIdGithub(idGithub);
    if (!user) {
      throw createError(404, "User Not Found");
    }

    return user;
  }
  async checkExistUserGithub(idGithub: string): Promise<boolean> {
    const check = await UserRepository.checkExistUserGithub(idGithub);
    if (check) {
      return true;
    }

    return false;
  }
  async save(userModel: createUserDto): Promise<any> {
    const checkEmail = await this.checkExists({
      "local.email": userModel.email,
    });

    if (!checkEmail) {
      const dataUser = await UserRepository.save(userModel);
      if (!dataUser) {
        throw createError(501, "Not Create User");
      }

      return dataUser;
    }

    throw createError.Conflict(`${userModel.email} is ready been registered`);
  }
  async saveGitHub(userModel: createUserDto): Promise<any> {
    const dataUser = await UserRepository.create(userModel);
    if (!dataUser) {
      throw createError(501, "Not Create User");
    }

    return dataUser;
  }
  async checkExists(condition: object): Promise<boolean> {
    const check = await UserRepository.checkExists(condition);
    if (check) {
      return true;
    }

    return false;
  }

  async findOneUserByEmail(email: string): Promise<any> {
    const user = await UserRepository.findOneByEmail(email);
    if (!user) {
      throw createError(404, "User Not Found");
    }

    return user;
  }

  async findOneAndUpdateByCondition(
    condition: object,
    update: object
  ): Promise<any> {
    const user = await UserRepository.findOneAndUpdateByCondition(
      condition,
      update
    );
    if (!user) {
      throw createError(404, "User Not Found");
    }

    return user;
  }

  async findOneById(id: string): Promise<any> {
    const user = await UserRepository.findOneById(id);
    if (!user) {
      throw createError(404, "User Not Found");
    }

    return user;
  }

  async getAllUserWithConditionShow(hasShow: object): Promise<any> {
    const users = await UserRepository.findAllHasShow(hasShow);

    if (!users) {
      throw createError(404, "User Not Found");
    }

    return users;
  }

  async deleteById(idUser: string): Promise<any> {
    const deleteUser = await UserRepository.deleteById(idUser);

    if (!deleteUser) {
      throw createError(404, "User Not Found");
    }

    return deleteUser;
  }

  async updateStatusUser(id: string, activity: boolean): Promise<any> {
    const updateUser = await UserRepository.updateActivityUser(id, activity);

    if (!updateUser) {
      throw createError(404, "User Not Found");
    }

    return updateUser;
  }
}

export default new UserService();
