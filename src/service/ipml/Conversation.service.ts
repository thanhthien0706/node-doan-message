import createError from "http-errors";
import { IConversation } from "../../interface/Conversation.interface";
import { IConversationDocument } from "../../model/Conversation.model";
import ConversationRepository from "../../repository/Conversation.repository";
import { IConversationService } from "../IConversation.service";

class ConversationService implements IConversationService {
  async createConversation(conversationModel: IConversation): Promise<any> {
    const result = await ConversationRepository.create(conversationModel);

    if (!result) {
      throw new createError.Conflict("Create Conversation Failed");
    }

    return result;
  }

  async findAllConversationByMeId(
    meId: string
  ): Promise<IConversationDocument | IConversationDocument[] | unknown> {
    const result: IConversationDocument | IConversationDocument[] | unknown =
      await ConversationRepository.findAllWithMeId(meId);

    if (!result) {
      throw new createError.Conflict(
        `Not Find All Conversation With Id ${meId}`
      );
    }

    return result;
  }
}

export default new ConversationService();
