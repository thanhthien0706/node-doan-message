import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import UserController from "../controller/web/User.controller";

import { findUserValid } from "../validation/UserValid";

router.get("/me", UserController.getMe);

router.get("/find", celebrate(findUserValid), UserController.findUser);

export default router;
