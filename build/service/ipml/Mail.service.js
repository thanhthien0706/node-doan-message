"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const enviroment_1 = require("./../../config/enviroment");
class MailService {
    sendMail(content, subject, toEmail) {
        return new Promise((resolve, reject) => {
            let transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: enviroment_1.EMAIL_USER,
                    pass: enviroment_1.EMAIL_PASSWORD,
                },
            });
            let mainOptions = {
                from: "NQH-Test nodemailer",
                to: toEmail,
                subject: subject,
                html: content,
            };
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    throw (0, http_errors_1.default)(500, "Not Send Mail");
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.default = new MailService();
