import { NextFunction, Request, Response } from "express";
import ResponseBasicDTO from "../../dto/response/ResponseDTO";
import { IConversation } from "../../interface/Conversation.interface";
import ConversationService from "../../service/ipml/Conversation.service";
import UtilsService from "../../service/ipml/Utils.service";

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

  // [POST] /conversation/create
  async createConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const conversationModel: IConversation = {
        nameGroup: null,
        channelId: UtilsService.randomString(8),
        avatar:
          "https://res.cloudinary.com/dd1yamek1/image/upload/v1670426295/doan4/group-chat-2_nzes2i.png",
        description: "Group chat of you",
        files: null,
        members: [req.id, req.body.idUser1],
        typeConversation: "group",
        isBlocked: false,
      };

      const conversation = await ConversationService.createConversation(
        conversationModel
      );

      const result = await ConversationService.findOneConversationById(
        conversation._id
      );

      return res
        .status(200)
        .json(
          new ResponseBasicDTO(
            true,
            "Create Conversation Successfully",
            result[0]
          )
        );
    } catch (error) {
      next(error);
    }
  }

  // [POST] /conversation/joinGroupChat
  async joinGroupChat(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ConversationService.joinGroupChat(
        req.body.idUser,
        req.body.idConversation
      );

      return res
        .status(200)
        .json(
          new ResponseBasicDTO(
            true,
            "Add User To Conversation Successfully",
            result
          )
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new ConversationController();
