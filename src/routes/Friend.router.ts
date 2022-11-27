import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import FriendController from "../controller/web/Friend.controller";

import { addFriendValid, findFriendValid } from "../validation/FriendValid";

router.get("/add", celebrate(addFriendValid), FriendController.addFriendById);
router.get("/find", celebrate(findFriendValid), FriendController.findFriend);

export default router;
