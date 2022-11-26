import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import AuthController from "../controller/auth/Auth.controller";
import {
  createUserValid,
  signInUserValid,
  forgotPasswordValid,
  resetPasswordValid,
  changePasswordValid,
} from "../validation/UserValid";

router.post("/signup", celebrate(createUserValid), AuthController.signup);
router.post("/signin", celebrate(signInUserValid), AuthController.signin);
router.post(
  "/forgot-password",
  celebrate(forgotPasswordValid),
  AuthController.forgotPassword
);
router.get(
  "/reset-password",
  celebrate(resetPasswordValid),
  AuthController.resetPassword
);
router.post(
  "/change-password",
  celebrate(changePasswordValid),
  AuthController.changePassword
);

router.get("/github", AuthController.signInGithub);
router.get("/github/callback", AuthController.signInGithubCallback);

export default router;
