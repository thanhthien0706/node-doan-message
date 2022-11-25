import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

// import AuthController from "../controller/Auth.controller";

import { createUserDto } from "../dto/request/UserDTO";

// router.post("/signup", celebrate(createUserDto), AuthController.signup);
// router.post("/signin", celebrate(signInUserDto), AuthController.signin);
// router.post(
//   "/forgot-password",
//   celebrate(forgotPasswordDto),
//   AuthController.forgotPassword
// );
// router.get(
//   "/reset-password",
//   celebrate(resetPasswordDto),
//   AuthController.resetPassword
// );
// router.post(
//   "/change-password",
//   celebrate(changePasswordDto),
//   AuthController.changePassword
// );

// router.get("/github", AuthController.signInGithub);
// router.get("/github/callback", AuthController.signInGithubCallback);

export default router;
