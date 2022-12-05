import { NextFunction, Request, Response } from "express";
import formidable, { Fields, Files } from "formidable";
import { Types } from "mongoose";
import { createMessageDTO } from "../../dto/request/MessageDTO";
import ResponseBasicDTO from "../../dto/response/ResponseDTO";
import CloudinaryService from "../../service/ipml/Cloudinary.service";
import MessageService from "../../service/ipml/Message.service";

const form = new formidable.IncomingForm({ multiples: true });

class MessageController {
  constructor() {}

  // [GET] /message?conversationId=....
  async getAllMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MessageService.findAllMessage(
        req.query.conversationId as string
      );

      return res
        .status(200)
        .json(
          new ResponseBasicDTO(true, "Get All Message Successfully", result)
        );
    } catch (error) {
      console.log("Tim loi", error);
      next(error);
    }
  }

  // [POST /message/add
  async addMessage(req: Request, res: Response, next: NextFunction) {
    try {
      form.parse(req, async function (err: any, fields: Fields, files: any) {
        const messModel: createMessageDTO = {
          content: fields.content as string,
          type: fields.type as string,
          conversation: new Types.ObjectId(fields.conversation as string),
          attachment: null,
          sender: new Types.ObjectId(req.id),
        };

        if (files.attachment) {
          const fileUpload: any = await CloudinaryService.uploadFile(
            files.attachment.filepath
          );

          messModel.attachment = fileUpload.url;
        }

        const result = await MessageService.createMessage(messModel);

        return res
          .status(200)
          .json(
            new ResponseBasicDTO(true, "Create Message Successfully", result)
          );
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MessageController();
