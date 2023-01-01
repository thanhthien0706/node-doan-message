import { Date } from "mongoose";

export interface createListTaskDto {
  name?: string;
  type?: string;
  members?: string[];
  listTasks?: string[];
}

export interface createTaskDto {
  name?: string;
  completed?: boolean;
  description?: string | null;
  dueDate?: string | null;
  worker?: string;
}

export interface updateTaskDto {
  idTask?: string;
  name?: string;
  description?: string;
  dueDate?: string;
  worker?: string;
}
