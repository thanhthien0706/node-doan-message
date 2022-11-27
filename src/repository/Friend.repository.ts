import { Types } from "mongoose";
import FriendModel, { IFriendDocument } from "../model/Friend.model";

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
      FriendModel.find({ me: meId, $text: { $search: searchText } })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export default new FriendRepository();
