import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import MessageController from "../controller/web/Message.controller";

import {
  createdMessageValid,
  findAllMessageValid,
} from "../validation/MessageValid";
// celebrate(createdMessageValid),
router.post("/add", MessageController.addMessage);
router.get(
  "/",
  celebrate(findAllMessageValid),
  MessageController.getAllMessage
);

export default router;
