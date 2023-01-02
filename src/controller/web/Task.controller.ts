import { NextFunction, Request, Response, query } from "express";
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

      console.log(req.body);

      const task = await TaskService.createTask(dataTask);

      const updateTask = await TaskService.updateTaskToListTask(
        task._id,
        req.body.idListTask
      );

      console.log(updateTask);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Create Task successfully", task));
    } catch (error) {
      next(error);
    }
  }

  async getListTask(req: Request, res: Response, next: NextFunction) {
    try {
      const type = req.query.type as string;
      const idMe = req.id as string;

      const listTasks = await TaskService.getAllListTask(idMe, type);

      return res
        .status(200)
        .json(
          new ResponseBasicDTO(true, "Get List Task successfully", listTasks)
        );
    } catch (error) {
      next(error);
    }
  }

  async getAllTask(req: Request, res: Response, next: NextFunction) {
    try {
      const idListTask = req.params.idListTask as string;

      const tasks = await TaskService.getAllTask(idListTask);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Get Task successfully", tasks));
    } catch (error) {
      next(error);
    }
  }

  async getTaskWithStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const idListTask = req.params.idListTask as string;
      const status = req.params.statusTask as unknown as boolean;

      const tasks = await TaskService.getWithStatusTask(idListTask, status);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Get Task successfully", tasks));
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.updateTask(req.body);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Update Task successfully", req.body));
    } catch (error) {
      next(error);
    }
  }

  async updateCompletedTask(req: Request, res: Response, next: NextFunction) {
    try {
      const completed = req.params.completed;
      const idTask = req.params.idTask;

      let completedTask = true;

      if (completed == "true") {
        completedTask = true;
      } else {
        completedTask = false;
      }

      await TaskService.updateCompletedTask(idTask, completedTask);

      const task = await TaskService.getOneTaskById(idTask);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Update Task successfully", task));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new TaskController();
