import { IConversation } from "../interface/Conversation.interface";
import { IConversationDocument } from "../model/Conversation.model";

export interface IConversationService {
  createConversation(conversationModel: IConversation): Promise<any>;

  findAllConversationByMeId(
    meId: string
  ): Promise<IConversationDocument | IConversationDocument[] | unknown>;

  findOneConversationById(idGroup: string): Promise<any>;

  checkUserExistInConversation(
    idUser: string,
    idConversation: string
  ): Promise<boolean>;

  joinGroupChat(idUser: string, idConversation: string): Promise<any>;
}
