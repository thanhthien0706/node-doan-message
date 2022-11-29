import { NextFunction, Request, Response } from "express";

import ResponseBasicDTO from "../../dto/response/ResponseDTO";

import UserService from "../../service/ipml/User.service";
import JwtService from "../../service/ipml/Jwt.service";

class UserController {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const token = JwtService.getToken(req.headers);
      const { id } = await JwtService.verifyToken(token);

      const user = await UserService.findOneById(id);

      return res.status(200).json(new ResponseBasicDTO(true, "Get me", user));
    } catch (error) {
      next(error);
    }
  }

  async findUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.searchUser(req.query.search as string);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Find users successfully", result));
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
