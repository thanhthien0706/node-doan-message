import { Document, model, Model, Schema, Types } from "mongoose";
import { INotifiAddFriend } from "../interface/NotifiAddFriend.interface";
import { ITimestamp } from "../interface/Timestamp.interface";

export interface INotifiAddFriendModel
  extends INotifiAddFriend,
    ITimestamp,
    Document {}

export interface INotifiAddFriendDocument
  extends INotifiAddFriend,
    ITimestamp,
    Document {}

const NotifiAddFriendSchema = new Schema(
  {
    description: { type: String },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
    },
    requester: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const NotifiAddFriendModel: Model<INotifiAddFriendModel> =
  model<INotifiAddFriendModel>("NotofiAddFriendModel", NotifiAddFriendSchema);

export default NotifiAddFriendModel;
