"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Socket_service_1 = __importDefault(require("../service/ipml/Socket.service"));
let io = null;
class SocketSetup {
    constructor(server) {
        this.initMain(server);
    }
    initMain(server) {
        io = require("socket.io")(server, {
            cors: {
                origin: "*",
            },
        });
        io.on("connection", this.handleConnections);
    }
    handleConnections(socket) {
        // console.log("co nguoi ket noi " + socket.id);
        new Socket_service_1.default(io, socket);
    }
}
exports.default = SocketSetup;
