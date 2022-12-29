"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Message_model_1 = __importDefault(require("../model/Message.model"));
class MessageRepository {
    findAllMessageByConversationId(conversationId) {
        return new Promise((resolve, reject) => {
            Message_model_1.default.aggregate([
                {
                    $match: {
                        conversation: new mongoose_1.default.Types.ObjectId(conversationId),
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "sender",
                        foreignField: "_id",
                        as: "dataSender",
                    },
                },
                {
                    $unwind: "$dataSender",
                },
                {
                    $project: {
                        _id: 1,
                        content: 1,
                        type: 1,
                        conversation: 1,
                        sender: 1,
                        attachment: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        "dataSender._id": 1,
                        "dataSender.local.fullname": 1,
                        "dataSender.username": 1,
                        "dataSender.avatar": 1,
                    },
                },
            ])
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    createMessage(messModel) {
        return new Promise((resolve, reject) => {
            Message_model_1.default.create(messModel)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    findOneMessage(id) {
        return new Promise((resolve, reject) => {
            Message_model_1.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.default.Types.ObjectId(id),
                    },
                },
                { $limit: 1 },
                {
                    $lookup: {
                        from: "users",
                        localField: "sender",
                        foreignField: "_id",
                        as: "dataSender",
                    },
                },
                {
                    $unwind: "$dataSender",
                },
                {
                    $project: {
                        _id: 1,
                        content: 1,
                        type: 1,
                        conversation: 1,
                        sender: 1,
                        attachment: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        "dataSender._id": 1,
                        "dataSender.local.fullname": 1,
                        "dataSender.username": 1,
                        "dataSender.avatar": 1,
                    },
                },
            ])
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}
exports.default = new MessageRepository();
