"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const ErrorDTO_1 = __importDefault(require("../dto/response/ErrorDTO"));
const ErrorHandler = (error, req, res, next) => {
    let statusError = error.status;
    let messageError = error.message;
    if (error.details) {
        const errorRequest = error.details.get("body");
        statusError = 500;
        messageError = errorRequest.message;
    }
    res.status(statusError | 500);
    res.json(new ErrorDTO_1.default(statusError, messageError));
    return res;
};
exports.ErrorHandler = ErrorHandler;
