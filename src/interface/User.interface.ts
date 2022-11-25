import { Types } from "mongoose";

export interface IUser {
  userName?: string;
  avatar?: string;
  local?: {
    fullName?: string;
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
