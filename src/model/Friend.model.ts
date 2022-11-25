import { model, Model, Schema, Types } from "mongoose";
import { IMyFriends } from "../interface/Friend.interface";
import { ITimestamp } from "../interface/Timestamp.interface";

export interface IFriendModel extends IMyFriends, ITimestamp, Document {}

export interface IFriendDocument extends IMyFriends, ITimestamp, Document {}

const FriendSchema = new Schema(
  {
    me: Types.ObjectId,
    friends: [
      {
        friend: Types.ObjectId,
        isBlocked: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const FriendModel: Model<IFriendModel> = model<IFriendModel>(
  "Friend",
  FriendSchema
);

export default FriendModel;
