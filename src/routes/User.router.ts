import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import UserController from "../controller/web/User.controller";

router.get("/me", UserController.getMe);

export default router;
