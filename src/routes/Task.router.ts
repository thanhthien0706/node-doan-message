import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import TaskController from "../controller/web/Task.controller";

import { createListTaskValid, createTaskValid } from "../validation/Task.valid";

router.post(
  "/list-task-create",
  celebrate(createListTaskValid),
  TaskController.createListTask
);

router.post(
  "/task-create",
  celebrate(createTaskValid),
  TaskController.createTask
);

export default router;
