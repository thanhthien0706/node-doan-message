import {
  createListTaskDto,
  createTaskDto,
  updateTaskDto,
} from "../dto/request/TaskDTO";

export interface ITaskService {
  createListTask(dataCreateListTask: createListTaskDto): Promise<any>;

  createTask(dataCreateTask: createTaskDto): Promise<any>;

  updateTaskToListTask(idTask: string, idListTask: string): Promise<any>;

  getAllListTask(idMe: string, type: string): Promise<any>;

  getAllTask(idListTask: string): Promise<any>;

  getWithStatusTask(idListTask: string, status: boolean): Promise<any>;

  updateTask(dataUpdate: updateTaskDto): Promise<any>;

  updateCompletedTask(idTask: string, completed: boolean): Promise<any>;

  getOneTaskById(idTask: string): Promise<any>;
}
