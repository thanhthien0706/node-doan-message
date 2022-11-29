import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { Types } from "mongoose";
import { nextTick } from "process";
import { sendInvitationFriendDto } from "../../dto/request/FriendDTO";

import ResponseBasicDTO from "../../dto/response/ResponseDTO";

import FriendService from "../../service/ipml/Friend.service";
import JwtService from "../../service/ipml/Jwt.service";
import NotifiAddFriendService from "../../service/ipml/NotifiAddFriend.service";

class FriendController {
  constructor() {}

  // [POST] /friend/send-invitation
  async sendInvitation(req: Request, res: Response, next: NextFunction) {
    try {
      const notifiModel: sendInvitationFriendDto = {
        description: req.body.description,
        receiver: req.body.receiver,
        requester: req.id,
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
      const addFriend: boolean = await FriendService.addFriend(
        req.id as string,
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
      const searchText = req.query.search as string;

      const dataSearch = await FriendService.searchFriend(
        req.id as string,
        searchText
      );

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Search Friend Of You", dataSearch));
    } catch (error) {
      next(error);
    }
  }

  // [GET] /friend/all
  async showAllNotifiAddFriend(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await NotifiAddFriendService.showAllNotifiAddFriend(
        req.id as string
      );

      return res
        .status(200)
        .json(
          new ResponseBasicDTO(
            true,
            "Show All List Notification Add Friend",
            result
          )
        );
    } catch (error) {
      next(error);
    }
  }

  // [GET] /friend/all-friend
  async showAllFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FriendService.findAllFriend(req.id as string);

      return res
        .status(200)
        .json(
          new ResponseBasicDTO(true, "Get List Friend Successfully", result)
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new FriendController();
