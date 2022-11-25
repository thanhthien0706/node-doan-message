import { Types } from "mongoose";

export interface createUserDto {
  username?: string;
  email?: string;
  password?: any;
  role?: any;
}
