"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusActive = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
exports.statusActive = {
    ACTIVE: 1,
    INACTIVE: 0,
};
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
    },
    avatar: {
        type: String,
    },
    local: {
        fullname: { type: String },
        email: { type: String },
        password: { type: String, select: false },
    },
    github: {
        id: { type: String },
        token: { type: String },
        displayName: { type: String },
    },
    phone: { type: String },
    role: {
        type: mongoose_1.Types.ObjectId,
        ref: "Role",
    },
    activity: { type: Boolean },
}, {
    timestamps: true,
});
UserSchema.method("generateHash", function (password) {
    return bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(8));
});
UserSchema.method("validPassword", function (password) {
    return bcrypt_nodejs_1.default.compareSync(password, this.local.password);
});
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
