"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    content: String,
    type: {
        type: String,
        enum: [
            "TEXT",
            "IMAGE",
            "VIDEO_CALL",
            "AUDIO",
            "VOICE_CALL",
            "VIDEO_MESS",
            "VOICE_MESS",
        ],
    },
    conversation: { type: mongoose_1.Types.ObjectId, ref: "Conversation" },
    sender: { type: mongoose_1.Types.ObjectId, ref: "User" },
    attachment: String,
}, { timestamps: true });
const MessageModel = (0, mongoose_1.model)("Message", MessageSchema);
exports.default = MessageModel;
