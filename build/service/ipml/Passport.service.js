"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = __importDefault(require("passport-github2"));
const enviroment_1 = require("../../config/enviroment");
const Role_service_1 = __importDefault(require("./Role.service"));
const User_service_1 = __importDefault(require("./User.service"));
const GitHubStrategy = passport_github2_1.default.Strategy;
function PassportService() {
    passport_1.default.serializeUser(function (user, done) {
        done(null, user);
    });
    passport_1.default.deserializeUser(function (user, done) {
        done(null, user);
    });
    passport_1.default.use(new GitHubStrategy({
        clientID: enviroment_1.GITHUB_CLIENT_ID,
        clientSecret: enviroment_1.GITHUB_CLIENT_SECRET,
        callbackURL: enviroment_1.GITHUB_URL_CALLBACK,
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(async () => {
            try {
                const checkUser = await User_service_1.default.checkExistUserGithub(profile.id);
                if (checkUser) {
                    const user = await User_service_1.default.findOneByIdGithub(profile.id);
                    return done(null, {
                        userExist: user,
                    });
                }
                else {
                    const role = await Role_service_1.default.findOneByName("ROLE_USER");
                    const newUser = {
                        "github.id": profile.id,
                        "github.token": accessToken,
                        "github.displayName": profile.displayName,
                        username: profile.username,
                        activity: true,
                        role: role._id,
                    };
                    const result = await User_service_1.default.saveGitHub(newUser);
                    if (result) {
                        return done(null, {
                            userCreate: newUser,
                        });
                    }
                }
            }
            catch (error) {
                return done(error.message);
            }
        });
    }));
}
exports.default = PassportService;
