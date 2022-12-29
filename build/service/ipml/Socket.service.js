"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_service_1 = __importDefault(require("./Message.service"));
const Cloudinary_service_1 = __importDefault(require("./Cloudinary.service"));
const mongoose_1 = require("mongoose");
let io;
let listUserPeers = [];
let socketId = "";
let socketExtenal = null;
class SocketService {
    constructor(ioM, socket) {
        io = ioM;
        this.socket = socket;
        socketId = this.socket.id;
        socketExtenal = this.socket;
        this.initMain();
    }
    initMain() {
        this.socket.on("disconnect", () => {
            const listExist = listUserPeers.filter((item) => {
                return item.idSocket !== this.socket.id;
            });
            listUserPeers = listExist;
        });
        this.socket.on("groupchat:join", (groups) => {
            this.socket.join(groups);
        });
        this.socket.on("groupchat:sendMess", this.sendMessengerToGroup);
        this.socket.on("clientSubscribePeerId", this.clientSubscribePeerId);
        this.socket.on("client:getDataPeerId", ({ idMe, listIdUser }) => {
            let listIdResult = [];
            listIdUser.forEach((item) => {
                const inforUser = listUserPeers.filter((e) => e.idUser === item);
                if (inforUser.length > 0) {
                    const inforUserCaller = listUserPeers.filter((el) => el.idUser == idMe);
                    const dataUserCallee = {
                        idUser: inforUser[0].idUser,
                        idPeer: inforUser[0].idPeer,
                        idSocket: inforUser[0].idSocket,
                    };
                    // const dataUserCaller = {
                    //   idUser: inforUserCaller[0].idUser,
                    //   idPeer: inforUserCaller[0].idPeer,
                    //   idSocket: inforUserCaller[0].idSocket,
                    // };
                    // io.to(dataUserCallee.idSocket).emit(
                    //   "serverSendInforCaller",
                    //   inforUserCaller[0]
                    // );
                    listIdResult.push(dataUserCallee);
                }
            });
            socketExtenal.emit(`serverSendIdPeers-${idMe}`, listIdResult);
        });
        this.socket.on("closeCall", ({ to }) => {
            console.log(to);
            io.to(to).emit("serverSendCloseCall");
        });
    }
    async sendMessengerToGroup({ data }) {
        const messModel = {
            content: data.content,
            type: data.type,
            conversation: new mongoose_1.Types.ObjectId(data.conversation),
            attachment: null,
            sender: new mongoose_1.Types.ObjectId(data.sender),
        };
        if (data.attachment) {
            const fileUpload = await Cloudinary_service_1.default.uploadFileBuffer(data.attachment);
            messModel.attachment = fileUpload.url;
        }
        const mess = await Message_service_1.default.createMessage(messModel);
        const resultMess = await Message_service_1.default.getOneMessage(mess._id);
        io.in(data.conversation).emit(`serverGroupChat:sendMess-${data.conversation}`, resultMess[0]);
    }
    clientSubscribePeerId({ idUser, idPeer }) {
        const checkExist = listUserPeers.filter((item) => {
            return item.idUser === idUser;
        });
        if (checkExist.length <= 0) {
            listUserPeers.push({ idUser, idPeer, idSocket: socketId });
        }
    }
}
exports.default = SocketService;
