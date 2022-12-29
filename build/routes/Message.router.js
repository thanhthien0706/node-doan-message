"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Message_controller_1 = __importDefault(require("../controller/web/Message.controller"));
const MessageValid_1 = require("../validation/MessageValid");
// celebrate(createdMessageValid),
router.post("/add", Message_controller_1.default.addMessage);
router.get("/", (0, celebrate_1.celebrate)(MessageValid_1.findAllMessageValid), Message_controller_1.default.getAllMessage);
exports.default = router;
