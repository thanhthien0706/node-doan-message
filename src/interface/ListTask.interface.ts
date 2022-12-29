import { Types } from "mongoose";
import { ITask } from "./Task.interface";

export interface IListTask {
  name?: string | null;
  members?: Types.ObjectId[] | null;
  listTasks?: Types.ObjectId[] | null;
  type?: string | null;
}
