import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import RoleController from "../controller/admin/Role.controller";
import { createRoleValid } from "../validation/RoleValid";

router.get("/init-role", RoleController.initData);
router.post("/add-role", celebrate(createRoleValid), RoleController.addRole);

export default router;
