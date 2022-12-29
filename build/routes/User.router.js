"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_controller_1 = __importDefault(require("../controller/web/User.controller"));
const UserValid_1 = require("../validation/UserValid");
router.get("/me", User_controller_1.default.getMe);
router.get("/find", (0, celebrate_1.celebrate)(UserValid_1.findUserValid), User_controller_1.default.findUser);
exports.default = router;
