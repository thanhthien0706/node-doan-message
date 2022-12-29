"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = require("ejs");
const http_errors_1 = __importDefault(require("http-errors"));
class FileService {
    async readViewEjs(path, params) {
        const html = ejs.renderFile(`./src/views/${path}`, Object.assign({}, params), { async: true });
        if (!html) {
            throw (0, http_errors_1.default)(501, "No Reading File");
        }
        return html;
    }
}
exports.default = new FileService();
