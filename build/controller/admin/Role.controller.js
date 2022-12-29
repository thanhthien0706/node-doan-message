"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_service_1 = __importDefault(require("../../service/ipml/Role.service"));
const ResponseDTO_1 = __importDefault(require("../../dto/response/ResponseDTO"));
class RoleController {
    async initData(req, res, next) {
        try {
            const arrayInforRole = [
                {
                    name: "ROLE_ADMIN",
                    description: "",
                },
                {
                    name: "ROLE_USER",
                    description: "",
                },
            ];
            const listData = [];
            arrayInforRole.forEach((role, index) => {
                Role_service_1.default.createRole(role)
                    .then((data) => {
                    listData.push(data);
                    if (index == arrayInforRole.length - 1) {
                        return res
                            .status(200)
                            .json(new ResponseDTO_1.default(true, "Create list role successfully", listData));
                    }
                })
                    .catch((error) => {
                    next(error);
                });
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async addRole(req, res, next) {
        try {
            const roleData = await Role_service_1.default.createRole(req.body);
            return res
                .status(200)
                .json(new ResponseDTO_1.default(true, "Create role successfully", roleData));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new RoleController();
