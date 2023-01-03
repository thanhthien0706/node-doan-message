import { Types } from "mongoose";

export interface IMessage {
  content?: string;
  type?:
    | "TEXT"
    | "IMAGE"
    | "VIDEO_CALL"
    | "FILE"
    | "AUDIO"
    | "VOICE_CALL"
    | "VIDEO_MESS"
    | "VOICE_MESS";
  conversation?: Types.ObjectId;
  sender?: Types.ObjectId;
  attachment?: String;
}
