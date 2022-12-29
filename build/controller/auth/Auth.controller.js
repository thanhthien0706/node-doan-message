"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseDTO_1 = __importDefault(require("../../dto/response/ResponseDTO"));
const Auth_service_1 = __importDefault(require("../../service/ipml/Auth.service"));
// import AuthService;
class AuthController {
    // [POST] /auth/signup
    async signup(req, res, next) {
        try {
            const userModel = req.body;
            const dataUser = await Auth_service_1.default.signup(userModel);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Create user successfully", dataUser));
        }
        catch (error) {
            next(error);
        }
    }
    // [POST] /auth/signin
    async signin(req, res, next) {
        try {
            const token = await Auth_service_1.default.signin(req.body);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Sign in successfully", token));
        }
        catch (error) {
            next(error);
        }
    }
    // [POST] /auth/forgot-password?email=....
    async forgotPassword(req, res, next) {
        try {
            const payload = {
                email: req.query.email,
                host: req.get("host"),
                protocol: req.protocol,
            };
            const forgotPassword = await Auth_service_1.default.forgotPassword(payload);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Send mail forgot password", null));
        }
        catch (error) {
            next(error);
        }
    }
    // [GET] /auth/forgot-password?token=...
    async resetPassword(req, res, next) {
        try {
            const token = req.query.token;
            const chekToken = await Auth_service_1.default.resetPassword(token);
            if (chekToken) {
                return res.render("page/Resetpassword", {
                    isShow: true,
                    token,
                    messPass: "",
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // [PUT] /auth/changePassword
    async changePassword(req, res, next) {
        try {
            const { newPassword, tokenReset } = req.body;
            const resultChangePassword = await Auth_service_1.default.changePassword(newPassword, tokenReset);
            if (resultChangePassword) {
                return res
                    .status(200)
                    .json(new ResponseDTO_1.default(true, "Change Password Success", null));
            }
        }
        catch (error) {
            next(error);
        }
    }
    // [GET] /auth/github
    async signInGithub(req, res, next) {
        try {
            await Auth_service_1.default.signinGithub(req, res, next);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async signInGithubCallback(req, res, next) {
        try {
            const token = await Auth_service_1.default.signinGithubCallback(req, res, next);
            if (token) {
                return res
                    .status(200)
                    .json(new ResponseDTO_1.default(true, "Sign in successfully", token));
            }
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new AuthController();
