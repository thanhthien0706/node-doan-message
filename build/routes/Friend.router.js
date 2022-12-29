"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Friend_controller_1 = __importDefault(require("../controller/web/Friend.controller"));
const FriendValid_1 = require("../validation/FriendValid");
router.get("/all", Friend_controller_1.default.showAllNotifiAddFriend);
router.get("/all-friend", Friend_controller_1.default.showAllFriend);
router.get("/add", (0, celebrate_1.celebrate)(FriendValid_1.addFriendValid), Friend_controller_1.default.addFriendById);
router.get("/find", (0, celebrate_1.celebrate)(FriendValid_1.findFriendValid), Friend_controller_1.default.findFriend);
router.post("/send-invitation", (0, celebrate_1.celebrate)(FriendValid_1.sendInvitationFriendValid), Friend_controller_1.default.sendInvitation);
exports.default = router;
