import mongoose, { Types } from "mongoose";
import { IConversation } from "../interface/Conversation.interface";
import ConversationModel, {
  IConversationDocument,
} from "../model/Conversation.model";

class ConversationRepository {
  create(conversationModel: IConversation) {
    return new Promise((resolve, reject) => {
      ConversationModel.create(conversationModel)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  findAllWithMeId(meId: string) {
    return new Promise((resolve, reject) => {
      ConversationModel.aggregate([
        {
          $match: { members: { $in: [new mongoose.Types.ObjectId(meId)] } },
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
            "dataMembers.activity": 1,
          },
        },
      ])
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  findOneConversationById(idGroup: string) {
    return new Promise((resolve, reject) => {
      ConversationModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(idGroup) },
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

  checkUserExistInConversation(idUser: string, idConversation: string) {
    return new Promise((resolve, reject) => {
      ConversationModel.findOne({
        _id: idConversation,
        members: idUser,
      })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  addUserToConversation(idUser: string, idConversation: string) {
    return new Promise((resolve, reject) => {
      ConversationModel.findOneAndUpdate(
        { _id: idConversation },
        {
          $push: {
            members: idUser,
          },
        }
      )
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export default new ConversationRepository();
