"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class ServerGlobal {
    constructor() {
        this.initMongoose();
    }
    initMongoose() {
        mongoose_1.default
            .connect("mongodb+srv://thanhthien:q5yTDRmTa0qMYF5e@cluster0.lqwkrcv.mongodb.net/db_doan_message?retryWrites=true&w=majority")
            .then(() => {
            console.log("Connect mongo successfully ");
        })
            .catch((e) => {
            console.log("Connect mongo failed: " + e.message);
        });
    }
    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new ServerGlobal();
        return this._instance;
    }
}
exports.default = ServerGlobal;
