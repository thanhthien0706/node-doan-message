"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseDTO_1 = __importDefault(require("../../dto/response/ResponseDTO"));
const Conversation_service_1 = __importDefault(require("../../service/ipml/Conversation.service"));
const Utils_service_1 = __importDefault(require("../../service/ipml/Utils.service"));
class ConversationController {
    // [GET] /conversation/all
    async findAddConversations(req, res, next) {
        try {
            const result = await Conversation_service_1.default.findAllConversationByMeId(req.id);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Find All Conversation Successfully", result));
        }
        catch (error) {
            next(error);
        }
    }
    // [POST] /conversation/create
    async createConversation(req, res, next) {
        try {
            const conversationModel = {
                nameGroup: null,
                channelId: Utils_service_1.default.randomString(8),
                avatar: "https://res.cloudinary.com/dd1yamek1/image/upload/v1670426295/doan4/group-chat-2_nzes2i.png",
                description: "Group chat of you",
                files: null,
                members: [req.id, req.body.idUser1],
                typeConversation: "group",
                isBlocked: false,
            };
            const conversation = await Conversation_service_1.default.createConversation(conversationModel);
            const result = await Conversation_service_1.default.findOneConversationById(conversation._id);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Create Conversation Successfully", result[0]));
        }
        catch (error) {
            next(error);
        }
    }
    // [POST] /conversation/joinGroupChat
    async joinGroupChat(req, res, next) {
        try {
            const result = await Conversation_service_1.default.joinGroupChat(req.body.idUser, req.body.idConversation);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Add User To Conversation Successfully", result));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new ConversationController();
