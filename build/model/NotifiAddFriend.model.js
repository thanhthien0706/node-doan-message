"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotifiAddFriendSchema = new mongoose_1.Schema({
    description: { type: String },
    receiver: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    requester: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
const NotifiAddFriendModel = (0, mongoose_1.model)("NotofiAddFriendModel", NotifiAddFriendSchema);
exports.default = NotifiAddFriendModel;
