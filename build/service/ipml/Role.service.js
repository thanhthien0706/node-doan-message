"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_repository_1 = __importDefault(require("../../repository/Role.repository"));
const http_errors_1 = __importDefault(require("http-errors"));
class RoleService {
    async checkRoleExist(dataCheck) {
        const check = await Role_repository_1.default.checkExists(dataCheck);
        if (!check) {
            return false;
        }
        return true;
    }
    async createRole(roleDto) {
        const check = await this.checkRoleExist({ name: roleDto.name });
        if (check) {
            throw (0, http_errors_1.default)(404, "Role Already Exists");
        }
        const newRole = await Role_repository_1.default.create(roleDto);
        if (!newRole) {
            throw (0, http_errors_1.default)(501, "Not Create Role");
        }
        return newRole;
    }
    async findOneByName(nameRole) {
        const dataRole = await Role_repository_1.default.findOneByName(nameRole);
        if (!dataRole) {
            throw (0, http_errors_1.default)(404, "Role Already Exists");
        }
        return dataRole;
    }
    async findOneByField(condition) {
        const dataRole = await Role_repository_1.default.findOneByField(condition);
        if (!dataRole) {
            throw (0, http_errors_1.default)(404, "Role Already Exists");
        }
        return dataRole;
    }
}
exports.default = new RoleService();
