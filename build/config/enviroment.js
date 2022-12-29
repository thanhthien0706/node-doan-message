"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_URL_CALLBACK = exports.GITHUB_CLIENT_SECRET = exports.GITHUB_CLIENT_ID = exports.EMAIL_PASSWORD = exports.EMAIL_USER = exports.MONGO_ENDPOINT = exports.JWT_SECRET = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || "dev"}.local` });
_a = process.env, exports.JWT_SECRET = _a.JWT_SECRET, exports.MONGO_ENDPOINT = _a.MONGO_ENDPOINT, exports.EMAIL_USER = _a.EMAIL_USER, exports.EMAIL_PASSWORD = _a.EMAIL_PASSWORD, exports.GITHUB_CLIENT_ID = _a.GITHUB_CLIENT_ID, exports.GITHUB_CLIENT_SECRET = _a.GITHUB_CLIENT_SECRET, exports.GITHUB_URL_CALLBACK = _a.GITHUB_URL_CALLBACK;
