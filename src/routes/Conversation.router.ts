import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import ConversationController from "../controller/web/Conversation.controller";
import {
  createConversation,
  joinGroupChatValid,
} from "../validation/ConversationValid";

router.get("/all", ConversationController.findAddConversations);
router.post(
  "/create",
  celebrate(createConversation),
  ConversationController.createConversation
);

router.post(
  "/joinGroupChat",
  celebrate(joinGroupChatValid),
  ConversationController.joinGroupChat
);

// router.get("");

export default router;
