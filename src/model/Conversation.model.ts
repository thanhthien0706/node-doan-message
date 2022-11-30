import { Document, model, Model, Schema, Types } from "mongoose";
import { IConversation } from "../interface/Conversation.interface";
import { ITimestamp } from "../interface/Timestamp.interface";

export interface IConversationModel
  extends IConversation,
    ITimestamp,
    Document {}

export interface IConversationDocument
  extends IConversation,
    ITimestamp,
    Document {}

const ConversationSchema = new Schema(
  {
    nameGroup: String,
    channelId: String,
    avatar: String,
    description: String,
    files: [{ type: String }],
    members: [{ type: Types.ObjectId, ref: "User" }],
    typeConversation: {
      type: String,
      enum: ["single", "group"],
    },
    isBlocked: Boolean,
  },
  { timestamps: true }
);

const ConversationModel: Model<IConversationModel> = model<IConversationModel>(
  "Conversation",
  ConversationSchema
);

export default ConversationModel;
