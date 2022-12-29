import { Types } from "mongoose";

export interface ITask {
  name?: string | null;
  completed?: boolean | null;
  description?: string | null;
  dueDate?: string | null;
  worker?: Types.ObjectId | null;
}
