"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FriendSchema = new mongoose_1.Schema({
    me: mongoose_1.Types.ObjectId,
    friends: [
        {
            friend: mongoose_1.Types.ObjectId,
            isBlocked: Boolean,
        },
        { _id: false },
    ],
}, { timestamps: true });
FriendSchema.index({ "$**": "text" });
const FriendModel = (0, mongoose_1.model)("Friend", FriendSchema);
exports.default = FriendModel;
