import { Types } from "mongoose";

export interface createUserDto {
  fullname?: string;
  username?: string;
  phone?: string;
  email?: string;
  password?: any;
  role?: any;
  activity?: boolean;
}

export interface signinUserDto {
  email: string;
  password: string;
}

export interface forgotPasswordDto {
  email: string;
  host: any;
  protocol: string;
}
