"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enviroment_1 = require("../../config/enviroment");
class JwtService {
    getToken(headers) {
        if (headers && headers.authorization != "") {
            if (headers.authorization) {
                const parted = headers.authorization.split(" ");
                if (parted.length === 2) {
                    return parted[1];
                }
            }
        }
        throw (0, http_errors_1.default)(404, "Token Not Found");
    }
    async generateToken(data, options = {}) {
        if (enviroment_1.JWT_SECRET) {
            try {
                let token = await jsonwebtoken_1.default.sign(data, enviroment_1.JWT_SECRET, Object.assign({ expiresIn: "30 days" }, options));
                if (token) {
                    return token;
                }
            }
            catch (error) {
                throw (0, http_errors_1.default)(401, "Not Generate Token");
            }
        }
    }
    async verifyToken(token, options = {}) {
        if (enviroment_1.JWT_SECRET) {
            try {
                let data = await jsonwebtoken_1.default.verify(token, enviroment_1.JWT_SECRET, Object.assign({}, options));
                if (data) {
                    return data;
                }
            }
            catch (error) {
                throw (0, http_errors_1.default)(401, "Not Verify Token");
            }
        }
    }
}
exports.default = new JwtService();
