"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importStar(require("../model/User.model"));
class UserRepository {
    checkExists(condition) {
        return new Promise((resolve, reject) => {
            User_model_1.default.exists(condition)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    checkExistUserGithub(idGithub) {
        return new Promise((resolve, reject) => {
            User_model_1.default.exists({
                "github.id": idGithub,
            })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    create(userModel) {
        return new Promise((resolve, reject) => {
            User_model_1.default.create(userModel)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => reject(err));
        });
    }
    save(userModel) {
        return new Promise((resolve, reject) => {
            const newUser = new User_model_1.default();
            newUser.username = userModel.username;
            newUser.avatar =
                "https://res.cloudinary.com/dovyiclf0/image/upload/v1669468094/doan4-message/user_djnyoz.png";
            if (newUser.local) {
                newUser.local.fullname = userModel.fullname;
                newUser.local.email = userModel.email;
                newUser.local.password = newUser.generateHash(userModel.password);
            }
            newUser.activity = User_model_1.statusActive.ACTIVE;
            newUser.phone = userModel.phone;
            newUser.role = userModel.role;
            newUser
                .save()
                .then((data) => {
                resolve(data);
            })
                .catch((err) => reject(err));
        });
    }
    // saveGitHub(userModel);
    findOneByEmail(email) {
        return new Promise((resolve, reject) => {
            User_model_1.default.findOne({ "local.email": email })
                .select("+local.password")
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    findOneAndUpdateByCondition(condition, update) {
        return new Promise((resolve, reject) => {
            User_model_1.default.findOneAndUpdate(condition, update)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    findOneById(id) {
        return new Promise((resolve, reject) => {
            User_model_1.default.findById(id)
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    findOneByIdGithub(idGithub) {
        return new Promise((resolve, reject) => {
            User_model_1.default.findOne({
                "github.id": idGithub,
            })
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    findAllHasShow(hasShow) {
        return new Promise((resolve, reject) => {
            User_model_1.default.aggregate([
                { $match: {} },
                {
                    $project: Object.assign({}, hasShow),
                },
            ])
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    searchUser(searchText) {
        return new Promise((resolve, reject) => {
            let regex = new RegExp(searchText, "i");
            User_model_1.default.find({
                $or: [
                    { username: regex },
                    { phone: regex },
                    { "local.fullname": regex },
                    { "local.email": regex },
                ],
            })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    deleteById(idUser) {
        return new Promise((resolve, reject) => {
            User_model_1.default.deleteOne({ _id: idUser })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
}
exports.default = new UserRepository();
