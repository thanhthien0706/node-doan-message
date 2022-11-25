import { model, Model, Schema, Document } from "mongoose";
import { ITimestamp } from "../interface/Timestamp.interface";
import IRole from "../interface/Role.interface";

export interface IRoleDocument extends IRole, ITimestamp, Document {}

export interface IRoleModel extends IRole, ITimestamp, Document {}

const RoleSchema: Schema = new Schema(
  {
    name: { type: String },
    desciption: { type: String },
  },
  {
    timestamps: true,
  }
);

const RoleModel: Model<IRoleModel> = model<IRoleModel>("Role", RoleSchema);

export default RoleModel;
