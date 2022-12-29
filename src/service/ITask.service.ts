import { createListTaskDto, createTaskDto } from "../dto/request/TaskDTO";

export interface ITaskService {
  createListTask(dataCreateListTask: createListTaskDto): Promise<any>;

  createTask(dataCreateTask: createTaskDto): Promise<any>;

  updateTaskToListTask(idTask: string, idListTask: string): Promise<any>;
}
