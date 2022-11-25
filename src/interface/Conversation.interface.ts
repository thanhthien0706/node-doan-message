import { Types } from "mongoose";

export interface IConversation {
  nameGroup?: string;
  channelId?: string;
  avatar?: string;
  description?: string;
  files?: string[];
  members?: Types.ObjectId[];
  isBlocked?: boolean;
}
