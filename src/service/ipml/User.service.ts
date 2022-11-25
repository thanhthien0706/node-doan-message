import createError from "http-errors";

import { createUserDto } from "../../dto/request/UserDTO";
import UserRepository from "../../repository/User.repository";
import { IUserService } from "../IUser.service";

class UserService implements IUserService {
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
  saveGitHub(userModel: createUserDto): Promise<any> {
    throw new Error("Method not implemented.");
  }
  checkExists(condition: object): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findOneUserByEmail(email: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findOneAndUpdateByCondition(condition: object, update: object): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getAllUserWithConditionShow(hasShow: object): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteById(idUser: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
