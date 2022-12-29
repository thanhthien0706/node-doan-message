"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const Conversation_repository_1 = __importDefault(require("../../repository/Conversation.repository"));
class ConversationService {
    async createConversation(conversationModel) {
        const result = await Conversation_repository_1.default.create(conversationModel);
        if (!result) {
            throw new http_errors_1.default.Conflict("Create Conversation Failed");
        }
        return result;
    }
    async findAllConversationByMeId(meId) {
        const result = await Conversation_repository_1.default.findAllWithMeId(meId);
        if (!result) {
            throw new http_errors_1.default.Conflict(`Not Find All Conversation With Id ${meId}`);
        }
        return result;
    }
    async findOneConversationById(idGroup) {
        const result = await Conversation_repository_1.default.findOneConversationById(idGroup);
        if (!result) {
            throw new http_errors_1.default.Conflict(`Not Find One Conversation With Id ${idGroup}`);
        }
        return result;
    }
    async checkUserExistInConversation(idUser, idConversation) {
        let check = false;
        const result = await Conversation_repository_1.default.checkUserExistInConversation(idUser, idConversation);
        if (result) {
            check = true;
        }
        return check;
    }
    async joinGroupChat(idUser, idConversation) {
        const checkExist = await this.checkUserExistInConversation(idUser, idConversation);
        if (checkExist) {
            throw new http_errors_1.default.Conflict("User already exists in conversation");
        }
        const result = await Conversation_repository_1.default.addUserToConversation(idUser, idConversation);
        if (!result) {
            throw new http_errors_1.default.Conflict("Not add user to conversation. Error " + result);
        }
        return result;
    }
}
exports.default = new ConversationService();
