import { createListTaskDto, createTaskDto } from "../../dto/request/TaskDTO";
import { ITaskService } from "../ITask.service";
import TaskRepository from "../../repository/Task.repository";
import { IListTask } from "../../interface/ListTask.interface";
import createErrorr from "http-errors";
import { ITask } from "../../interface/Task.interface";

class TaskService implements ITaskService {
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
}

export default new TaskService();
