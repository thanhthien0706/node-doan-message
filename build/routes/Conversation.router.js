"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Conversation_controller_1 = __importDefault(require("../controller/web/Conversation.controller"));
const ConversationValid_1 = require("../validation/ConversationValid");
router.get("/all", Conversation_controller_1.default.findAddConversations);
router.post("/create", (0, celebrate_1.celebrate)(ConversationValid_1.createConversation), Conversation_controller_1.default.createConversation);
router.post("/joinGroupChat", (0, celebrate_1.celebrate)(ConversationValid_1.joinGroupChatValid), Conversation_controller_1.default.joinGroupChat);
exports.default = router;
