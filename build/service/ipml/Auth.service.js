"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const passport_1 = __importDefault(require("passport"));
const File_service_1 = __importDefault(require("./File.service"));
const Jwt_service_1 = __importDefault(require("./Jwt.service"));
const Mail_service_1 = __importDefault(require("./Mail.service"));
const Role_service_1 = __importDefault(require("./Role.service"));
const User_service_1 = __importDefault(require("./User.service"));
class AuthService {
    async signup(userModel) {
        const dataRoleUser = await Role_service_1.default.findOneByName("ROLE_USER");
        if (dataRoleUser) {
            userModel.role = dataRoleUser._id;
            userModel.activity = true;
            const user = await User_service_1.default.save(userModel);
            return user;
        }
    }
    async signin(userModel) {
        const dataUser = await User_service_1.default.findOneUserByEmail(userModel.email);
        if (!dataUser.validPassword(userModel.password)) {
            throw (0, http_errors_1.default)(200, "Wrong Password");
        }
        const token = await Jwt_service_1.default.generateToken({ id: dataUser._id });
        return token;
    }
    async forgotPassword(payload) {
        const user = await User_service_1.default.findOneUserByEmail(payload.email);
        if (user) {
            const token = await Jwt_service_1.default.generateToken({ id: user._id }, {
                expiresIn: "2h",
            });
            const url = `${payload.protocol}://${payload.host}/auth/reset-password?token=${token}`;
            const contentMail = await File_service_1.default.readViewEjs("mail/MailResetPassword.ejs", {
                link: url,
                hours: 2,
            });
            const subject = `Reset Password for ${user._id}`;
            const toEmail = user.local.email;
            const resultSendMail = await Mail_service_1.default.sendMail(contentMail, subject, toEmail);
            if (resultSendMail) {
                return true;
            }
        }
    }
    async resetPassword(token) {
        const dataToken = await Jwt_service_1.default.verifyToken(token);
        if (dataToken.exp < new Date().getTime() / 1000) {
            throw (0, http_errors_1.default)(401, "Token Expired");
        }
        return true;
    }
    async changePassword(newPassword, token) {
        const dataToken = await Jwt_service_1.default.verifyToken(token);
        if (dataToken) {
            const oldUser = await User_service_1.default.findOneById(dataToken.id);
            const user = await User_service_1.default.findOneAndUpdateByCondition({
                _id: dataToken.id,
            }, {
                "local.password": oldUser.generateHash(newPassword),
            });
            return true;
        }
    }
    signinGithub(req, res, next) {
        passport_1.default.authenticate("github", { scope: ["user:email"] })(req, res, next);
    }
    signinGithubCallback(req, res, next) {
        return new Promise((resolve, reject) => {
            passport_1.default.authenticate("github", async (err, user) => {
                if (err) {
                    reject((0, http_errors_1.default)(500, err));
                }
                if (user.userExist) {
                    const token = await Jwt_service_1.default.generateToken({
                        id: user.userExist._id,
                    });
                    resolve(token);
                }
                else {
                    const token = await Jwt_service_1.default.generateToken({
                        id: user.userCreate._id,
                    });
                    resolve(token);
                }
            })(req, res, next);
        });
    }
}
exports.default = new AuthService();
