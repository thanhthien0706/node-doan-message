"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formidable_1 = __importDefault(require("formidable"));
const mongoose_1 = require("mongoose");
const ResponseDTO_1 = __importDefault(require("../../dto/response/ResponseDTO"));
const Cloudinary_service_1 = __importDefault(require("../../service/ipml/Cloudinary.service"));
const Message_service_1 = __importDefault(require("../../service/ipml/Message.service"));
const form = new formidable_1.default.IncomingForm({ multiples: true });
class MessageController {
    constructor() { }
    // [GET] /message?conversationId=....
    async getAllMessage(req, res, next) {
        try {
            const result = await Message_service_1.default.findAllMessage(req.query.conversationId);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Get All Message Successfully", result));
        }
        catch (error) {
            console.log("Tim loi", error);
            next(error);
        }
    }
    // [POST /message/add
    async addMessage(req, res, next) {
        try {
            form.parse(req, async function (err, fields, files) {
                const messModel = {
                    content: fields.content,
                    type: fields.type,
                    conversation: new mongoose_1.Types.ObjectId(fields.conversation),
                    attachment: null,
                    sender: new mongoose_1.Types.ObjectId(req.id),
                };
                if (files.attachment) {
                    const fileUpload = await Cloudinary_service_1.default.uploadFile(files.attachment.filepath);
                    messModel.attachment = fileUpload.url;
                }
                const result = await Message_service_1.default.createMessage(messModel);
                return res
                    .status(200)
                    .json(new ResponseDTO_1.default(true, "Create Message Successfully", result));
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new MessageController();
