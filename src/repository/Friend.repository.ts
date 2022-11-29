import mongoose, { Types } from "mongoose";
import FriendModel, { IFriendDocument } from "../model/Friend.model";
import NotifiAddFriendRepository from "./NotifiAddFriend.repository";

class FriendRepository {
  addFriend(friendModel: IFriendDocument) {
    return new Promise((resolve, reject) => {
      FriendModel.create(friendModel)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  findOneById(id: Types.ObjectId) {
    return new Promise((resolve, reject) => {
      FriendModel.findOne({ me: id })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  updateFriend(condition: object, updateData: object) {
    return new Promise((resolve, reject) => {
      FriendModel.updateOne(condition, updateData)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  checkExistFriend(idUser: Types.ObjectId, idFriend: Types.ObjectId) {
    return new Promise((resolve, reject) => {
      FriendModel.findOne({ me: idUser, "friends.friend": idFriend })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  searchFriend(meId: Types.ObjectId, searchText: string) {
    return new Promise((resolve, reject) => {
      FriendModel.aggregate([
        {
          $match: { me: new mongoose.Types.ObjectId(meId) },
        },
        {
          $lookup: {
            from: "users",
            localField: "friends.friend",
            foreignField: "_id",
            as: "dataFriends",
          },
        },
        {
          $match: {
            "dataFriends.username": new RegExp(searchText, "i"),
          },
        },
      ])
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export default new FriendRepository();
