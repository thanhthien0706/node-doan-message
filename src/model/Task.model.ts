import { Model, Schema, Types, model } from "mongoose";
import { ITask } from "../interface/Task.interface";
import { ITimestamp } from "../interface/Timestamp.interface";
import { IListTaskModel } from "./ListTask.model";

export interface ITaskModel extends ITask, ITimestamp, Document {}

export interface ITaskDocument extends ITask, ITimestamp, Document {}

const TaskSchema = new Schema(
  {
    name: String,
    completed: Boolean,
    description: String,
    dueDate: Date,
    worker: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const TaskModel: Model<ITaskModel> = model<IListTaskModel>("Task", TaskSchema);

export default TaskModel;
