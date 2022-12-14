import {
  createListTaskDto,
  createTaskDto,
  updateTaskDto,
} from "../../dto/request/TaskDTO";
import { ITaskService } from "../ITask.service";
import TaskRepository from "../../repository/Task.repository";
import { IListTask } from "../../interface/ListTask.interface";
import createErrorr from "http-errors";
import { ITask } from "../../interface/Task.interface";

class TaskService implements ITaskService {
  async getOneTaskById(idTask: string): Promise<any> {
    return TaskRepository.findOneById(idTask);
  }

  async createListTask(dataCreateListTask: createListTaskDto): Promise<any> {
    const dataListTask = await TaskRepository.createListTask(
      dataCreateListTask as IListTask
    );

    if (!dataListTask) {
      throw new createErrorr.Conflict("Not create task");
    }

    return dataListTask;
  }

  async createTask(dataCreateTask: createTaskDto): Promise<any> {
    const dataTask = await TaskRepository.createTask(dataCreateTask as ITask);

    if (!dataTask) {
      throw new createErrorr.Conflict("Not create task");
    }

    return dataTask;
  }

  async updateTaskToListTask(idTask: string, idListTask: string): Promise<any> {
    const addTask = await TaskRepository.addTaskToListTask(idTask, idListTask);

    if (!addTask) {
      throw new createErrorr.Conflict("Not add task");
    }

    return addTask;
  }

  async getAllListTask(idMe: string, type: string): Promise<any> {
    const listTasks = await TaskRepository.findTaskByIdMeAndType(idMe, type);

    if (!listTasks) {
      throw new createErrorr.NotFound("Not find list task");
    }

    return listTasks;
  }

  async getAllTask(idListTask: string): Promise<any> {
    const tasks: any = await TaskRepository.findAllTaskByIdListTask(idListTask);

    if (!tasks) {
      throw new createErrorr.NotFound("Not find task");
    }

    const dataTasks = tasks[0].dataTasks;

    return dataTasks;
  }

  async getWithStatusTask(idListTask: string, status: boolean): Promise<any> {
    const tasks: any = await TaskRepository.findAllTaskByIdListTaskAndStatus(
      idListTask,
      status
    );

    if (!tasks) {
      throw new createErrorr.NotFound("Not find task");
    }

    let dataTasks;

    if (tasks.length === 0) {
      dataTasks = [];
    } else {
      dataTasks = tasks[0].dataTasks;
    }
    // const dataTasks = tasks[0].dataTasks;

    return dataTasks;
  }

  async updateTask(dataUpdate: updateTaskDto): Promise<any> {
    const task = await TaskRepository.updateTask(dataUpdate);

    if (!task) {
      throw new createErrorr.Conflict("Not update task");
    }

    return task;
  }

  async updateCompletedTask(idTask: string, completed: boolean): Promise<any> {
    const task = await TaskRepository.updateCompletedTask(idTask, completed);

    if (!task) {
      throw new createErrorr.Conflict("Not update task");
    }

    return task;
  }
}

export default new TaskService();
