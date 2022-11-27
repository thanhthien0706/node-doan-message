import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import ResponseBasicDTO from "../../dto/response/ResponseDTO";

import FriendService from "../../service/ipml/Friend.service";
import JwtService from "../../service/ipml/Jwt.service";

class FriendController {
  // [GET] /friend/add?id=....
  async addFriendById(req: Request, res: Response, next: NextFunction) {
    try {
      const token = JwtService.getToken(req.headers);
      const { id } = await JwtService.verifyToken(token);

      const addFriend: boolean = await FriendService.addFriend(
        id,
        req.query.id as string
      );

      if (!addFriend) {
        throw createError(500, "Add Friend Failed");
      }

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Addfriend Successfully", true));
    } catch (error) {
      next(error);
    }
  }

  // [GET] /friend/find?search=....
  async findFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const token = JwtService.getToken(req.headers);
      const { id } = await JwtService.verifyToken(token);

      const searchText = req.query.search as string;

      const dataSearch = await FriendService.searchFriend(id, searchText);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Search Friend Of You", dataSearch));
    } catch (error) {
      next(error);
    }
  }
}

export default new FriendController();
