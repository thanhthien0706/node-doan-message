"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Friend_model_1 = __importDefault(require("../model/Friend.model"));
class FriendRepository {
    addFriend(friendModel) {
        return new Promise((resolve, reject) => {
            Friend_model_1.default.create(friendModel)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    findOneById(id) {
        return new Promise((resolve, reject) => {
            Friend_model_1.default.findOne({ me: id })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    findAllById(id) {
        return new Promise((resolve, reject) => {
            Friend_model_1.default.aggregate([
                { $match: { me: new mongoose_1.default.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "users",
                        localField: "friends.friend",
                        foreignField: "_id",
                        as: "dataFriends",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        friends: 1,
                        me: 1,
                        "dataFriends._id": 1,
                        "dataFriends.local.fullname": 1,
                        "dataFriends.local.email": 1,
                        "dataFriends.username": 1,
                        "dataFriends.avatar": 1,
                        "dataFriends.activity": 1,
                        "dataFriends.phone": 1,
                    },
                },
            ])
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    updateFriend(condition, updateData) {
        return new Promise((resolve, reject) => {
            Friend_model_1.default.updateOne(condition, updateData)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    checkExistFriend(idUser, idFriend) {
        return new Promise((resolve, reject) => {
            Friend_model_1.default.findOne({ me: idUser, "friends.friend": idFriend })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    searchFriend(meId, searchText) {
        return new Promise((resolve, reject) => {
            Friend_model_1.default.aggregate([
                {
                    $match: { me: new mongoose_1.default.Types.ObjectId(meId) },
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
exports.default = new FriendRepository();
