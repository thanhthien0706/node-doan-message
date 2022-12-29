"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConversationSchema = new mongoose_1.Schema({
    nameGroup: String,
    channelId: String,
    avatar: String,
    description: String,
    files: [{ type: String }],
    members: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
    typeConversation: {
        type: String,
        enum: ["single", "group"],
    },
    isBlocked: Boolean,
}, { timestamps: true });
const ConversationModel = (0, mongoose_1.model)("Conversation", ConversationSchema);
exports.default = ConversationModel;
