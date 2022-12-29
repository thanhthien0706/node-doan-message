"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enviroment_1 = require("../config/enviroment");
class ServerGlobal {
    constructor() {
        this.initMongoose();
    }
    initMongoose() {
        mongoose_1.default
            .connect(enviroment_1.MONGO_ENDPOINT)
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
