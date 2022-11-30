import { Types } from "mongoose";

export interface IConversation {
  nameGroup?: string | null;
  channelId?: string;
  avatar?: string | null;
  description?: string;
  files?: string[] | null;
  members?: string[];
  typeConversation?: string;
  isBlocked?: boolean;
}
