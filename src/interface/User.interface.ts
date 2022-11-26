import { Types } from "mongoose";

export interface IUser {
  username?: string;
  avatar?: string;
  local?: {
    fullname?: string;
    email?: string;
    password?: string;
  };
  github?: {
    id?: string;
    token?: string;
    displayName?: string;
  };
  phone?: string;
  role?: Types.ObjectId;
  activity?: boolean | number;
}
