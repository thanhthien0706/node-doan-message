"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_repository_1 = __importDefault(require("../../repository/Message.repository"));
const http_errors_1 = __importDefault(require("http-errors"));
class MessageService {
    async createMessage(messModel) {
        const dataMess = await Message_repository_1.default.createMessage(messModel);
        if (!dataMess) {
            throw new http_errors_1.default.Conflict(dataMess.message);
        }
        return dataMess;
    }
    async findAllMessage(conversationId) {
        const dataMess = await Message_repository_1.default.findAllMessageByConversationId(conversationId);
        if (!dataMess) {
            throw new http_errors_1.default.Conflict(dataMess.message);
        }
        return dataMess;
    }
    async getOneMessage(id) {
        const dataMess = await Message_repository_1.default.findOneMessage(id);
        if (!dataMess) {
            throw new http_errors_1.default.Conflict(dataMess.message);
        }
        return dataMess;
    }
}
exports.default = new MessageService();
