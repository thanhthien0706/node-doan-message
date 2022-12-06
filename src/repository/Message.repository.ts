import mongoose, { Types } from "mongoose";
import { createMessageDTO } from "../dto/request/MessageDTO";
import MessageModel, { IMessageDocument } from "../model/Message.model";

class MessageRepository {
  findAllMessageByConversationId(conversationId: string) {
    return new Promise((resolve, reject) => {
      MessageModel.aggregate([
        {
          $match: {
            conversation: new mongoose.Types.ObjectId(conversationId),
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

  createMessage(messModel: object) {
    return new Promise((resolve, reject) => {
      MessageModel.create(messModel)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export default new MessageRepository();
