import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import FriendController from "../controller/web/Friend.controller";

import {
  addFriendValid,
  findFriendValid,
  sendInvitationFriendValid,
} from "../validation/FriendValid";

router.get("/add", celebrate(addFriendValid), FriendController.addFriendById);
router.get("/find", celebrate(findFriendValid), FriendController.findFriend);

router.post(
  "/send-invitation",
  celebrate(sendInvitationFriendValid),
  FriendController.sendInvitation
);

export default router;
