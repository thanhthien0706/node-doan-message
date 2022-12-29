"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Auth_controller_1 = __importDefault(require("../controller/auth/Auth.controller"));
const UserValid_1 = require("../validation/UserValid");
router.post("/signup", (0, celebrate_1.celebrate)(UserValid_1.createUserValid), Auth_controller_1.default.signup);
router.post("/signin", (0, celebrate_1.celebrate)(UserValid_1.signInUserValid), Auth_controller_1.default.signin);
router.post("/forgot-password", (0, celebrate_1.celebrate)(UserValid_1.forgotPasswordValid), Auth_controller_1.default.forgotPassword);
router.get("/reset-password", (0, celebrate_1.celebrate)(UserValid_1.resetPasswordValid), Auth_controller_1.default.resetPassword);
router.post("/change-password", (0, celebrate_1.celebrate)(UserValid_1.changePasswordValid), Auth_controller_1.default.changePassword);
router.get("/github", Auth_controller_1.default.signInGithub);
router.get("/github/callback", Auth_controller_1.default.signInGithubCallback);
exports.default = router;
