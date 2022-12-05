import mongoose, { Types } from "mongoose";
import { createMessageDTO } from "../dto/request/MessageDTO";
import MessageModel, { IMessageDocument } from "../model/Message.model";

class MessageRepository {
  findAllMessageByConversationId(conversationId: string) {
    return new Promise((resolve, reject) => {
      MessageModel.find({
        conversation: new mongoose.Types.ObjectId(conversationId),
      })
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
