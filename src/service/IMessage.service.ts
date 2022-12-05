import { createMessageDTO } from "../dto/request/MessageDTO";

export interface IMessageService {
  createMessage(messModel: createMessageDTO): Promise<any>;

  findAllMessage(conversationId: string): Promise<any>;
}
