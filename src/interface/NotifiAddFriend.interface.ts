import { Types } from "mongoose";

export interface INotifiAddFriend {
  description?: string;
  receiver?: Types.ObjectId;
  requester?: Types.ObjectId;
}
