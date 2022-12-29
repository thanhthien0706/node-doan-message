import { Model, Schema, Types, model } from "mongoose";
import { IListTask } from "../interface/ListTask.interface";
import { ITimestamp } from "../interface/Timestamp.interface";

export interface IListTaskModel extends IListTask, ITimestamp, Document {}

export interface IListTaskDocument extends IListTask, ITimestamp, Document {}

const ListTaskSchema = new Schema(
  {
    name: String,
    members: [{ type: Types.ObjectId, ref: "User" }],
    listTasks: [{ type: Types.ObjectId, ref: "Task" }],
    type: { type: String, enum: ["single", "group"] },
  },
  {
    timestamps: true,
  }
);

const ListTaskModel: Model<IListTaskModel> = model<IListTaskModel>(
  "ListTask",
  ListTaskSchema
);

export default ListTaskModel;
