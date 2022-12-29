"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UtilsService {
    randomString(len) {
        const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
        let result = "";
        for (let i = 0; i < len; i++) {
            result += characters.charAt(Math.floor(Math.random() + characters.length));
        }
        return result;
    }
}
exports.default = new UtilsService();
