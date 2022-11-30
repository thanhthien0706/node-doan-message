import { NextFunction, Request, Response } from "express";
import ResponseBasicDTO from "../../dto/response/ResponseDTO";
import ConversationService from "../../service/ipml/Conversation.service";

class ConversationController {
  // [GET] /conversation/all
  async findAddConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ConversationService.findAllConversationByMeId(
        req.id as string
      );

      return res
        .status(200)
        .json(
          new ResponseBasicDTO(
            true,
            "Find All Conversation Successfully",
            result
          )
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new ConversationController();
