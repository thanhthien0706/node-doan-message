"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../routes"));
const http_1 = __importDefault(require("http"));
const SocketSetup_1 = __importDefault(require("./SocketSetup"));
// import allowCors from "./CorsVercel";
const app = (0, express_1.default)();
class ExpressSetup {
    constructor() {
        this.server = http_1.default.createServer(app);
    }
    mainInit() {
        // app.use(allowCors);
        app.use((0, cors_1.default)({
            origin: "*",
        }));
        // view engine setup
        app.set("views", "./src/views");
        app.set("view engine", "ejs");
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(express_1.default.static("./public"));
        app.use((0, express_session_1.default)({
            secret: "thanhthien bla bla",
            resave: false,
            saveUninitialized: true,
        }));
        new SocketSetup_1.default(this.server);
        new routes_1.default(app);
        return this.server;
    }
}
exports.default = ExpressSetup;
