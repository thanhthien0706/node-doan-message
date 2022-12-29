"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Conversation_model_1 = __importDefault(require("../model/Conversation.model"));
class ConversationRepository {
    create(conversationModel) {
        return new Promise((resolve, reject) => {
            Conversation_model_1.default.create(conversationModel)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    findAllWithMeId(meId) {
        return new Promise((resolve, reject) => {
            Conversation_model_1.default.aggregate([
                {
                    $match: { members: { $in: [new mongoose_1.default.Types.ObjectId(meId)] } },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "members",
                        foreignField: "_id",
                        as: "dataMembers",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        nameGroup: 1,
                        channelId: 1,
                        avatar: 1,
                        description: 1,
                        files: 1,
                        members: 1,
                        typeConversation: 1,
                        isBlocked: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        "dataMembers._id": 1,
                        "dataMembers.local.email": 1,
                        "dataMembers.local.fullname": 1,
                        "dataMembers.username": 1,
                        "dataMembers.avatar": 1,
                        "dataMembers.phone": 1,
                    },
                },
            ])
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    findOneConversationById(idGroup) {
        return new Promise((resolve, reject) => {
            Conversation_model_1.default.aggregate([
                {
                    $match: { _id: new mongoose_1.default.Types.ObjectId(idGroup) },
                },
                {
                    $limit: 1,
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "members",
                        foreignField: "_id",
                        as: "dataMembers",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        nameGroup: 1,
                        channelId: 1,
                        avatar: 1,
                        description: 1,
                        files: 1,
                        members: 1,
                        typeConversation: 1,
                        isBlocked: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        "dataMembers._id": 1,
                        "dataMembers.local.email": 1,
                        "dataMembers.local.fullname": 1,
                        "dataMembers.username": 1,
                        "dataMembers.avatar": 1,
                        "dataMembers.phone": 1,
                    },
                },
            ])
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    checkUserExistInConversation(idUser, idConversation) {
        return new Promise((resolve, reject) => {
            Conversation_model_1.default.findOne({
                _id: idConversation,
                members: idUser,
            })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    addUserToConversation(idUser, idConversation) {
        return new Promise((resolve, reject) => {
            Conversation_model_1.default.findOneAndUpdate({ _id: idConversation }, {
                $push: {
                    members: idUser,
                },
            })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}
exports.default = new ConversationRepository();
