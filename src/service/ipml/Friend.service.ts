import createError from "http-errors";

import { IFriendService } from "../IFriend.service";

import FriendRepository from "../../repository/Friend.repository";
import FriendModel, { IFriendDocument } from "../../model/Friend.model";

import { Types } from "mongoose";
import { IFriend } from "../../interface/Friend.interface";
import { sendInvitationFriendDto } from "../../dto/request/FriendDTO";
import NotifiAddFriendService from "./NotifiAddFriend.service";

class FriendService implements IFriendService {
  async sendInvitationFriend(
    notifiModel: sendInvitationFriendDto
  ): Promise<boolean> {
    const notifi = await NotifiAddFriendService.createNotifiInvitation(
      notifiModel
    );

    if (!notifi) {
      throw new createError.NotImplemented("Not create notification addFriend");
    }

    return true;
  }

  async addFriend(
    meId: string,
    friendId: string,
    status: boolean
  ): Promise<boolean> {
    const resultDeleteNotifi = await NotifiAddFriendService.removeInvitaion(
      meId,
      friendId
    );

    if (resultDeleteNotifi && status) {
      await Promise.all([
        this.createFriend(meId, friendId),
        this.createFriend(friendId, meId),
      ]);
    }

    return true;
  }

  async createFriend(meId: string, friendId: string) {
    const checkAddFriend = await this.checkAddedFriend(meId, friendId);
    if (checkAddFriend) {
      throw createError(500, "You guys were friends");
    }
    const checkExist = await this.checkUserExist(meId);
    if (checkExist) {
      // update
      const result = await FriendRepository.updateFriend(
        {
          me: meId as unknown as Types.ObjectId,
        },
        {
          $push: {
            friends: {
              friend: friendId as unknown as Types.ObjectId,
              isBlocked: false,
            } as IFriend,
          },
        }
      );
      if (!result) {
        throw createError(500, "Not Update User Add Friend");
      }
    } else {
      // crate new
      const friendModel: IFriendDocument = new FriendModel();
      friendModel.me = meId as unknown as Types.ObjectId;
      friendModel.friends = {
        friend: friendId as unknown as Types.ObjectId,
        isBlocked: false,
      } as IFriend;
      const result = await FriendRepository.addFriend(friendModel);
      if (!result) {
        throw createError(500, "Not Create User Add Friend");
      }
    }
  }

  async searchFriend(meId: string, searchText: string): Promise<any> {
    const result = await FriendRepository.searchFriend(
      meId as unknown as Types.ObjectId,
      searchText
    );

    if (!result) {
      throw createError(500, "Can't find friend");
    }

    return result;
  }

  async findFriendById(id: string): Promise<any> {}

  async checkUserExist(id: string): Promise<boolean> {
    let check = false;

    const findFriend = await FriendRepository.findOneById(
      id as unknown as Types.ObjectId
    );

    if (findFriend) {
      check = true;
    }

    return check;
  }

  async checkAddedFriend(idUser: string, idFriend: string): Promise<boolean> {
    let check = false;

    const result = await FriendRepository.checkExistFriend(
      idUser as unknown as Types.ObjectId,
      idFriend as unknown as Types.ObjectId
    );

    console.log(result);

    if (result) {
      check = true;
    }

    return check;
  }

  async findAllFriend(meId: string): Promise<any> {
    const friends = await FriendRepository.findAllById(meId);

    if (!friends) {
      throw new createError.NotFound("Friends of you is empty");
    }

    return friends;
  }
}

export default new FriendService();
