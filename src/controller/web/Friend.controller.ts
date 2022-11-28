import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { Types } from "mongoose";
import { sendInvitationFriendDto } from "../../dto/request/FriendDTO";

import ResponseBasicDTO from "../../dto/response/ResponseDTO";

import FriendService from "../../service/ipml/Friend.service";
import JwtService from "../../service/ipml/Jwt.service";

class FriendController {
  // [POST] /friend/send-invitation
  async sendInvitation(req: Request, res: Response, next: NextFunction) {
    console.log("da vao gui");
    try {
      const token = JwtService.getToken(req.headers);
      const { id } = await JwtService.verifyToken(token);

      const notifiModel: sendInvitationFriendDto = {
        description: req.body.description,
        receiver: req.body.receiver,
        requester: id,
      };

      const checkNotifi = await FriendService.sendInvitationFriend(notifiModel);

      console.log(checkNotifi);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Send Invatation successfully", ""));
    } catch (error) {
      next(error);
    }
  }

  // [GET] /friend/add?id=....
  async addFriendById(req: Request, res: Response, next: NextFunction) {
    try {
      const token = JwtService.getToken(req.headers);
      const { id } = await JwtService.verifyToken(token);

      const addFriend: boolean = await FriendService.addFriend(
        id,
        req.query.id as string,
        req.query.status as unknown as boolean
      );

      if (!addFriend) {
        throw createError(500, "Add Friend Failed");
      }

      return res
        .status(200)
        .json(
          new ResponseBasicDTO(
            true,
            `Handle Notification Invitaion With Statu ${req.query.status} successfully`,
            true
          )
        );
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
