import { createMessageDTO } from "../../dto/request/MessageDTO";
import { IMessageService } from "../IMessage.service";

import MessageRepository from "../../repository/Message.repository";
import createErrorr from "http-errors";
import { IMessageDocument } from "../../model/Message.model";

class MessageService implements IMessageService {
  async createMessage(messModel: createMessageDTO): Promise<any> {
    const dataMess: any = await MessageRepository.createMessage(messModel);

    if (!dataMess) {
      throw new createErrorr.Conflict(dataMess.message);
    }

    return dataMess;
  }

  async findAllMessage(conversationId: string): Promise<any> {
    const dataMess: any =
      await MessageRepository.findAllMessageByConversationId(conversationId);

    if (!dataMess) {
      throw new createErrorr.Conflict(dataMess.message);
    }

    return dataMess;
  }
}

export default new MessageService();
