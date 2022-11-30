import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import ConversationController from "../controller/web/Conversation.controller";

router.get("/all", ConversationController.findAddConversations);

export default router;
