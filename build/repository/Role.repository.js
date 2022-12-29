"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_model_1 = __importDefault(require("../model/Role.model"));
class RoleRepository {
    checkExists(dataCheck) {
        return new Promise((resolve, reject) => {
            Role_model_1.default.exists(dataCheck)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    create(roleModel) {
        return new Promise((resolve, reject) => {
            Role_model_1.default.create(roleModel)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => reject(err));
        });
    }
    findOneByField(conditionField) {
        return new Promise((resolve, reject) => {
            Role_model_1.default.findOne(conditionField)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    findOneByName(name) {
        return new Promise((resolve, reject) => {
            Role_model_1.default.findOne({ name: name })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}
exports.default = new RoleRepository();
