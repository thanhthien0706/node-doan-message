"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const ErrorHandler_middleware_1 = require("../middleware/ErrorHandler.middleware");
const CheckAccount_middleware_1 = __importDefault(require("../middleware/CheckAccount.middleware"));
const Auth_router_1 = __importDefault(require("./Auth.router"));
const Role_router_1 = __importDefault(require("./Role.router"));
const User_router_1 = __importDefault(require("./User.router"));
const Friend_router_1 = __importDefault(require("./Friend.router"));
const Conversation_router_1 = __importDefault(require("./Conversation.router"));
const Message_router_1 = __importDefault(require("./Message.router"));
class Index {
    constructor(appContext) {
        this.app = appContext;
        this.initRoutes();
    }
    initRoutes() {
        this.app.use("/message", CheckAccount_middleware_1.default.checkLogin, Message_router_1.default);
        this.app.use("/conversation", CheckAccount_middleware_1.default.checkLogin, Conversation_router_1.default);
        this.app.use("/friend", CheckAccount_middleware_1.default.checkLogin, Friend_router_1.default);
        this.app.use("/user", User_router_1.default);
        this.app.use("/auth", Auth_router_1.default);
        this.app.use("/role", Role_router_1.default);
        this.app.use("/test", (res, req) => {
            return req.json({
                mess: "Welcome to my app",
            });
        });
        this.app.use((req, res, next) => {
            next(new http_errors_1.default.NotFound("Link Api Not Found"));
        });
        this.app.use(ErrorHandler_middleware_1.ErrorHandler);
    }
}
exports.default = Index;
