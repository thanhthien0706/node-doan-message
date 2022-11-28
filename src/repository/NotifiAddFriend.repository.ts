import { Types } from "mongoose";
import { sendInvitationFriendDto } from "../dto/request/FriendDTO";
import NotifiAddFriendModel from "../model/NotifiAddFriend.model";

class NotifiAddFriendRepository {
  createNotifi(
    notifiAddFriend: sendInvitationFriendDto | sendInvitationFriendDto[]
  ) {
    return new Promise((resolve, reject) => {
      NotifiAddFriendModel.create(notifiAddFriend)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  findAddFriend(requesterId: string, receiverId: string) {
    return new Promise((resolve, reject) => {
      NotifiAddFriendModel.findOne({
        receiver: receiverId as unknown as Types.ObjectId,
        requester: requesterId as unknown as Types.ObjectId,
      })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  deleteInvitation(requesterId: string, receiverId: string) {
    return new Promise((resolve, reject) => {
      NotifiAddFriendModel.findOneAndDelete({
        receiver: receiverId as unknown as Types.ObjectId,
        requester: requesterId as unknown as Types.ObjectId,
      })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export default new NotifiAddFriendRepository();
