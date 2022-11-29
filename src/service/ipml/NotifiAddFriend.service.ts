import createError from "http-errors";

import { sendInvitationFriendDto } from "../../dto/request/FriendDTO";
import { INotifiAddFriendService } from "../INotifiAddFriend.service";

import NotifiAddFriendRepository from "../../repository/NotifiAddFriend.repository";

class NotifiAddFriendService implements INotifiAddFriendService {
  async createNotifiInvitation(
    notifiModel: sendInvitationFriendDto
  ): Promise<any> {
    const checkExist = await this.checkInvitationExist(
      notifiModel.requester as string,
      notifiModel.receiver as string
    );

    if (checkExist) {
      throw new createError.Conflict("Notification Invitaion already exists");
    }

    const result = await NotifiAddFriendRepository.createNotifi(notifiModel);

    if (result) {
      return result;
    }

    throw new createError.NotImplemented("Not Create Notification AddFriend");
  }

  async checkInvitationExist(
    requesterId: string,
    receiverId: string
  ): Promise<boolean> {
    let check = false;

    const result = await NotifiAddFriendRepository.findAddFriend(
      requesterId,
      receiverId
    );

    if (result) {
      check = true;
    }

    return check;
  }

  async removeInvitaion(
    requesterId: string,
    receiverId: string
  ): Promise<boolean> {
    const result = await NotifiAddFriendRepository.deleteInvitation(
      requesterId,
      receiverId
    );

    if (!result) {
      throw new createError.Conflict("Not Delete Invitation Add Friend");
    }
    return true;
  }

  async showAllNotifiAddFriend(meId: string): Promise<any> {
    const users: any = await NotifiAddFriendRepository.findAllWithMeId(meId);

    if (users.length === 0) {
      throw new createError.NotFound(
        `User with id ${meId} not have notification addfriend`
      );
    }

    if (!users) {
      throw new createError.NotFound(`User with id ${meId} find errors`);
    }

    return users;
  }
}

export default new NotifiAddFriendService();
