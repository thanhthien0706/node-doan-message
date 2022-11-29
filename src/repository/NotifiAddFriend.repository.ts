import mongoose, { Types } from "mongoose";
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

  findAllWithMeId(meid: string) {
    return new Promise((resolve, reject) => {
      NotifiAddFriendModel.aggregate([
        {
          $match: {
            receiver: new mongoose.Types.ObjectId(meid),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "requester",
            foreignField: "_id",
            as: "dataRequester",
          },
        },
        {
          $unwind: "$dataRequester",
        },
        {
          $project: {
            _id: 1,
            description: 1,
            requester: 1,
            createdAt: 1,
            updatedAt: 1,
            "dataRequester._id": 1,
            "dataRequester.local.fullname": 1,
            "dataRequester.avatar": 1,
          },
        },
      ])
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  findWithCondition(condition: object) {
    return new Promise((resolve, reject) => {
      NotifiAddFriendModel.find(condition)
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
