"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const User_repository_1 = __importDefault(require("../../repository/User.repository"));
class UserService {
    async searchUser(searchText) {
        const users = await User_repository_1.default.searchUser(searchText);
        if (!users || users.length <= 0) {
            throw new http_errors_1.default.NotFound("Users Not Found");
        }
        return users;
    }
    async findOneByIdGithub(idGithub) {
        const user = await User_repository_1.default.findOneByIdGithub(idGithub);
        if (!user) {
            throw (0, http_errors_1.default)(404, "User Not Found");
        }
        return user;
    }
    async checkExistUserGithub(idGithub) {
        const check = await User_repository_1.default.checkExistUserGithub(idGithub);
        if (check) {
            return true;
        }
        return false;
    }
    async save(userModel) {
        const checkEmail = await this.checkExists({
            "local.email": userModel.email,
        });
        if (!checkEmail) {
            const dataUser = await User_repository_1.default.save(userModel);
            if (!dataUser) {
                throw (0, http_errors_1.default)(501, "Not Create User");
            }
            return dataUser;
        }
        throw http_errors_1.default.Conflict(`${userModel.email} is ready been registered`);
    }
    async saveGitHub(userModel) {
        const dataUser = await User_repository_1.default.create(userModel);
        if (!dataUser) {
            throw (0, http_errors_1.default)(501, "Not Create User");
        }
        return dataUser;
    }
    async checkExists(condition) {
        const check = await User_repository_1.default.checkExists(condition);
        if (check) {
            return true;
        }
        return false;
    }
    async findOneUserByEmail(email) {
        const user = await User_repository_1.default.findOneByEmail(email);
        if (!user) {
            throw (0, http_errors_1.default)(404, "User Not Found");
        }
        return user;
    }
    async findOneAndUpdateByCondition(condition, update) {
        const user = await User_repository_1.default.findOneAndUpdateByCondition(condition, update);
        if (!user) {
            throw (0, http_errors_1.default)(404, "User Not Found");
        }
        return user;
    }
    async findOneById(id) {
        const user = await User_repository_1.default.findOneById(id);
        if (!user) {
            throw (0, http_errors_1.default)(404, "User Not Found");
        }
        return user;
    }
    async getAllUserWithConditionShow(hasShow) {
        const users = await User_repository_1.default.findAllHasShow(hasShow);
        if (!users) {
            throw (0, http_errors_1.default)(404, "User Not Found");
        }
        return users;
    }
    async deleteById(idUser) {
        const deleteUser = await User_repository_1.default.deleteById(idUser);
        if (!deleteUser) {
            throw (0, http_errors_1.default)(404, "User Not Found");
        }
        return deleteUser;
    }
}
exports.default = new UserService();
