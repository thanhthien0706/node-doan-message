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

  async findOneConversationById(idGroup: string): Promise<any> {
    const result: IConversationDocument | IConversationDocument[] | unknown =
      await ConversationRepository.findOneConversationById(idGroup);

    if (!result) {
      throw new createError.Conflict(
        `Not Find One Conversation With Id ${idGroup}`
      );
    }

    return result;
  }

  async checkUserExistInConversation(
    idUser: string,
    idConversation: string
  ): Promise<boolean> {
    let check = false;

    const result = await ConversationRepository.checkUserExistInConversation(
      idUser,
      idConversation
    );

    if (result) {
      check = true;
    }

    return check;
  }

  async joinGroupChat(idUser: string, idConversation: string): Promise<any> {
    const checkExist = await this.checkUserExistInConversation(
      idUser,
      idConversation
    );

    if (checkExist) {
      throw new createError.Conflict("User already exists in conversation");
    }

    const result: any = await ConversationRepository.addUserToConversation(
      idUser,
      idConversation
    );

    if (!result) {
      throw new createError.Conflict(
        "Not add user to conversation. Error " + result
      );
    }

    return result;
  }
}

export default new ConversationService();
