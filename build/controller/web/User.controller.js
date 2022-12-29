"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseDTO_1 = __importDefault(require("../../dto/response/ResponseDTO"));
const User_service_1 = __importDefault(require("../../service/ipml/User.service"));
const Jwt_service_1 = __importDefault(require("../../service/ipml/Jwt.service"));
class UserController {
    async getMe(req, res, next) {
        try {
            const token = Jwt_service_1.default.getToken(req.headers);
            const { id } = await Jwt_service_1.default.verifyToken(token);
            const user = await User_service_1.default.findOneById(id);
            return res.status(200).json(new ResponseDTO_1.default(true, "Get me", user));
        }
        catch (error) {
            next(error);
        }
    }
    async findUser(req, res, next) {
        try {
            const result = await User_service_1.default.searchUser(req.query.search);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Find users successfully", result));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new UserController();
