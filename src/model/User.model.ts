import { Model, model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt-nodejs";

import { ITimestamp } from "../interface/Timestamp.interface";
import { IUser } from "../interface/User.interface";

export const statusActive = {
  ACTIVE: 1,
  INACTIVE: 0,
};

export interface IUserModel extends IUser, ITimestamp, Document {
  generateHash: (password: string) => string;
  validPassword: (password: string) => boolean;
}

export interface IUserDocument extends IUser, ITimestamp, Document {}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
    },
    avatar: {
      type: String,
    },
    local: {
      fullName: { type: String },
      email: { type: String },
      password: { type: String },
    },
    github: {
      id: { type: String },
      token: { type: String },
      displayName: { type: String },
    },
    phone: { type: String },
    role: {
      type: Types.ObjectId,
      ref: "Role",
    },
    activity: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

UserSchema.method("generateHash", function (password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
});

UserSchema.method("validPassword", function (password: string): boolean {
  return bcrypt.compareSync(password, this.local.password);
});

const UserModel: Model<IUserModel> = model<IUserModel>("User", UserSchema);

export default UserModel;
