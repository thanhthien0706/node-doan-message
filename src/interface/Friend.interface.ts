import { Types } from "mongoose";

export interface IMyFriends {
  me: Types.ObjectId;
  friends: IFriend[];
}

export interface IFriend {
  friend: Types.ObjectId;
  isBlocked: boolean;
}
