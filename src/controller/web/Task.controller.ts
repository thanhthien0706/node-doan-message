import { NextFunction, Request, Response } from "express";
import ResponseBasicDTO from "../../dto/response/ResponseDTO";

import { createListTaskDto, createTaskDto } from "../../dto/request/TaskDTO";
import TaskService from "../../service/ipml/Task.service";

class TaskController {
  async createListTask(req: Request, res: Response, next: NextFunction) {
    try {
      const dataTask: createListTaskDto = {
        ...req.body,
        listTasks: [],
      };

      const listTask = await TaskService.createListTask(dataTask);

      return res
        .status(200)
        .json(
          new ResponseBasicDTO(true, "Create List Task successfully", listTask)
        );
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const dataTask: createTaskDto = {
        ...req.body,
        completed: false,
      };

      const task = await TaskService.createTask(dataTask);

      const updateTask = await TaskService.updateTaskToListTask(
        task._id,
        req.body.completed
      );

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Create Task successfully", task));
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
