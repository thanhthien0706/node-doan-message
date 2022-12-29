"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotifiAddFriend_model_1 = __importDefault(require("../model/NotifiAddFriend.model"));
class NotifiAddFriendRepository {
    createNotifi(notifiAddFriend) {
        return new Promise((resolve, reject) => {
            NotifiAddFriend_model_1.default.create(notifiAddFriend)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    findAddFriend(requesterId, receiverId) {
        return new Promise((resolve, reject) => {
            NotifiAddFriend_model_1.default.findOne({
                receiver: receiverId,
                requester: requesterId,
            })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    findAllWithMeId(meid) {
        return new Promise((resolve, reject) => {
            NotifiAddFriend_model_1.default.aggregate([
                {
                    $match: {
                        receiver: new mongoose_1.default.Types.ObjectId(meid),
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
    findWithCondition(condition) {
        return new Promise((resolve, reject) => {
            NotifiAddFriend_model_1.default.find(condition)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    deleteInvitation(requesterId, receiverId) {
        return new Promise((resolve, reject) => {
            NotifiAddFriend_model_1.default.findOneAndDelete({
                receiver: receiverId,
                requester: requesterId,
            })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}
exports.default = new NotifiAddFriendRepository();
