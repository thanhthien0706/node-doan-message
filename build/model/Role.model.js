"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    name: { type: String },
    desciption: { type: String },
}, {
    timestamps: true,
});
const RoleModel = (0, mongoose_1.model)("Role", RoleSchema);
exports.default = RoleModel;
