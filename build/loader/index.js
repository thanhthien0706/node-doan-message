"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerGlobal_1 = __importDefault(require("./ServerGlobal"));
const Passport_service_1 = __importDefault(require("../service/ipml/Passport.service"));
class Index {
    constructor() {
        this.initMainLoader();
    }
    async initMainLoader() {
        await ServerGlobal_1.default.getInstance();
        await (0, Passport_service_1.default)();
    }
}
exports.default = Index;
