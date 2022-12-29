"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseBasicDTO {
    constructor(status, message, data) {
        this.status = status || true;
        this.message = message;
        this.data = data;
    }
}
exports.default = ResponseBasicDTO;
