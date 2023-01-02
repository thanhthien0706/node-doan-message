import { celebrate } from "celebrate";
import express from "express";
const router = express.Router();

import TaskController from "../controller/web/Task.controller";

import {
  createListTaskValid,
  createTaskValid,
  paramQueryTaskValid,
  paramGetTaskInListValid,
  paramGetTaskInListWithStatusValid,
  updateTaskValid,
  paramQueryConfirmTaskValid,
} from "../validation/Task.valid";

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

router.get("/me", celebrate(paramQueryTaskValid), TaskController.getListTask);

router.get(
  "/:idListTask",
  celebrate(paramGetTaskInListValid),
  TaskController.getAllTask
);

router.put(
  "/update/:idTask",
  celebrate(updateTaskValid),
  TaskController.updateTask
);

router.get("/confirm/:idTask/:completed", TaskController.updateCompletedTask);

router.get(
  "/one/:idListTask/:statusTask",
  celebrate(paramGetTaskInListWithStatusValid),
  TaskController.getTaskWithStatus
);
export default router;
