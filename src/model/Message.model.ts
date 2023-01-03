import { Model, model, Schema, Types } from "mongoose";
import { IMessage } from "../interface/Message.interface";
import { ITimestamp } from "../interface/Timestamp.interface";

export interface IMessageModel extends IMessage, ITimestamp, Document {}

export interface IMessageDocument extends IMessage, ITimestamp, Document {}

const MessageSchema = new Schema(
  {
    content: String,
    type: {
      type: String,
      enum: [
        "TEXT",
        "IMAGE",
        "FILE",
        "VIDEO_CALL",
        "AUDIO",
        "VOICE_CALL",
        "VIDEO_MESS",
        "VOICE_MESS",
      ],
    },
    conversation: { type: Types.ObjectId, ref: "Conversation" },
    sender: { type: Types.ObjectId, ref: "User" },
    attachment: String,
  },
  { timestamps: true }
);

const MessageModel: Model<IMessageModel> = model<IMessageModel>(
  "Message",
  MessageSchema
);

export default MessageModel;
