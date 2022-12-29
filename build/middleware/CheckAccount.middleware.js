"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt_service_1 = __importDefault(require("../service/ipml/Jwt.service"));
const http_errors_1 = __importDefault(require("http-errors"));
const Role_service_1 = __importDefault(require("../service/ipml/Role.service"));
const User_service_1 = __importDefault(require("../service/ipml/User.service"));
class CheckAccount {
    async checkLogin(req, res, next) {
        try {
            const token = Jwt_service_1.default.getToken(req.headers);
            if (token === null) {
                throw (0, http_errors_1.default)(401, "Expired Tokens");
            }
            let dataToken = await Jwt_service_1.default.verifyToken(token);
            if (dataToken.id === null) {
                throw (0, http_errors_1.default)(401, "Not Verify Token");
            }
            else {
                req.id = dataToken.id;
                next();
            }
        }
        catch (error) {
            next(error);
        }
    }
    checkRole(roleName) {
        return async (req, res, next) => {
            try {
                const token = Jwt_service_1.default.getToken(req.headers);
                if (token == null) {
                    throw (0, http_errors_1.default)(401, "Expired Tokens");
                }
                let dataToken = await Jwt_service_1.default.verifyToken(token);
                if (dataToken === null) {
                    throw (0, http_errors_1.default)(401, "Not Verify Token");
                }
                else {
                    const idUser = dataToken.id;
                    const user = await User_service_1.default.findOneById(idUser);
                    if (!user) {
                        throw (0, http_errors_1.default)(404, "User Is Exist");
                    }
                    const role = await Role_service_1.default.findOneByField({
                        _id: user.role,
                    });
                    if (role.name.toLowerCase() == roleName.toLowerCase()) {
                        return next();
                    }
                    throw (0, http_errors_1.default)(403, "Not Permission");
                }
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = new CheckAccount();
